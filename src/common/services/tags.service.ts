import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPaginationParams } from '../interfaces';
import { DocsPagination } from '../interfaces/docs-pagination.interface';
import { pagination } from '../utils';
import { Tag } from '@prisma/client';
import * as slugify from 'arslugify';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    page = 1,
    limit = 10,
  }: IPaginationParams): Promise<DocsPagination> {
    const [result, total] = await Promise.all([
      this.prisma.tag.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.tag.count({}),
    ]);

    return pagination(result, total, page, limit);
  }

  async findOne(id: number): Promise<Tag | null> {
    return this.prisma.tag.findUnique({ where: { id } });
  }

  async create({ title, content }: Tag): Promise<Tag> {
    return this.prisma.tag.create({
      data: {
        title,
        content,
        slug: slugify(title),
      },
    });
  }
}
