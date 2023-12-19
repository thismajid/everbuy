import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from 'src/common/services/categories.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
})
export class CategoryModule {}
