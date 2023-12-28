import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPaginationParams } from '../interfaces';
import { DocsPagination } from '../interfaces/docs-pagination.interface';
import { pagination } from '../utils';
import { Product } from '@prisma/client';
import * as slugify from 'arslugify';
import { CreateProductDto } from '../types/create-product.type';
import { errorMessages } from 'src/config';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    page = 1,
    limit = 10,
  }: IPaginationParams): Promise<DocsPagination> {
    const [result, total] = await Promise.all([
      this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.product.count({}),
    ]);

    return pagination(result, total, page, limit);
  }

  async findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async create({
    title,
    description,
    price,
    discount,
    quantity,
    categoryIds,
  }: CreateProductDto): Promise<Product> {
    return await this.prisma.product.create({
      data: {
        title,
        description,
        slug: slugify(title),
        price,
        discount,
        quantity,
        categories:
          categoryIds.length > 0
            ? {
                create: categoryIds.map((categoryId) => ({
                  category: {
                    connect: { id: categoryId },
                  },
                })),
              }
            : {},
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async update({
    id,
    product,
  }: {
    id: number;
    product: Product;
  }): Promise<Product | null> {
    return await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...product,
      },
    });
  }

  async delete({ id }: { id: number }): Promise<Product | null> {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async isProductExist({ id }: { id: number }): Promise<void> {
    const productExist = await this.findOne(id);
    if (!productExist) {
      throw new NotFoundException(errorMessages.CLIENT.PRODUCT.NOT_EXIST);
    }
  }

  async checkProductQuantity({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }): Promise<void> {
    const product = await this.findOne(id);
    if (!product || product.quantity < quantity) {
      throw new BadRequestException(errorMessages.CLIENT.PRODUCT.QUANTITY_MORE);
    }
  }
}
