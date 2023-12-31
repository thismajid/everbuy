import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPaginationParams } from '../interfaces';
import * as slugify from 'arslugify';
import { pagination } from '../utils';
import { DocsPagination } from '../interfaces/docs-pagination.interface';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    page = 1,
    limit = 10,
  }: IPaginationParams): Promise<DocsPagination> {
    const [result, total] = await Promise.all([
      this.prisma.category.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.category.count({}),
    ]);

    return pagination(result, total, page, limit);
  }

  async findOne(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async create({ title, content }: Category): Promise<Category> {
    return this.prisma.category.create({
      data: {
        title,
        content,
        slug: slugify(title),
      },
    });
  }

  async update({
    id,
    category,
  }: {
    id: number;
    category: Category;
  }): Promise<Category | null> {
    return await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        ...category,
      },
    });
  }

  async delete({ id }: { id: number }): Promise<Category | null> {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
