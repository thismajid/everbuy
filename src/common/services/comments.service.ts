import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICommentsPaginationParams } from '../interfaces';
import { DocsPagination } from '../interfaces/docs-pagination.interface';
import { pagination } from '../utils';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async findAllByProductId({
    page = 1,
    limit = 10,
    productId,
  }: ICommentsPaginationParams): Promise<DocsPagination> {
    const [result, total] = await Promise.all([
      this.prisma.comment.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          productId,
        },
      }),
      this.prisma.product.count({}),
    ]);

    return pagination(result, total, page, limit);
  }
}
