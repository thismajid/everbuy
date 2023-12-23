import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from 'src/common/services';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
