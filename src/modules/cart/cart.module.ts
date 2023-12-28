import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from 'src/common/services/cart.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService, UsersService } from 'src/common/services';

@Module({
  controllers: [CartController],
  providers: [CartService, UsersService, ProductsService, PrismaService],
})
export class CartModule {}
