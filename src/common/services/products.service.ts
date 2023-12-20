import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPaginationParams } from '../interfaces';
import { DocsPagination } from '../interfaces/docs-pagination.interface';
import { pagination } from '../utils';
import { Product } from '@prisma/client';
import * as slugify from 'arslugify';

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
  }: Product): Promise<Product> {
    return this.prisma.product.create({
      data: {
        title,
        description,
        price,
        discount,
        quantity,
        slug: slugify(title),
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
}
