import { Injectable } from '@nestjs/common';
import { Cart, CartItem } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICart } from '../interfaces';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async upsertUserCart({
    firstName = null,
    lastName = null,
    mobile = null,
    email = null,
    line1 = null,
    line2 = null,
    city = null,
    province = null,
    country = null,
    content = null,
    userId,
  }: ICart): Promise<Cart> {
    return await this.prisma.cart.upsert({
      where: {
        userId,
      },
      update: {
        firstName,
        lastName,
        mobile,
        email,
        line1,
        line2,
        city,
        province,
        country,
        content,
      },
      create: {
        firstName,
        lastName,
        mobile,
        email,
        line1,
        line2,
        city,
        province,
        country,
        content,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async addToCart({
    productId,
    quantity,
    price,
    discount,
    cartId,
  }: {
    productId: number;
    quantity: number;
    price: number;
    discount: number;
    cartId: number;
  }): Promise<CartItem> {
    return await this.prisma.cartItem.create({
      data: {
        price,
        discount,
        quantity,
        product: {
          connect: {
            id: productId,
          },
        },
        cart: {
          connect: {
            id: cartId,
          },
        },
      },
    });
  }
}
