import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators';
import { ApiAddToCart } from './decorators';
import {
  CartService,
  ProductsService,
  UsersService,
} from 'src/common/services';
import { AddToCartDto } from 'src/common/types';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}

  @Post('/:productId')
  @ApiAddToCart()
  async addToCart(
    @CurrentUser() userId,
    @Body() body: AddToCartDto,
  ): Promise<void> {
    const { productId, quantity } = body;
    await this.productsService.isProductExist({ id: productId });
    await this.productsService.checkProductQuantity({
      id: productId,
      quantity,
    });
    const { price, discount } = await this.productsService.findOne(productId);
    const { id: cartId } = await this.cartService.upsertUserCart({ userId });
    await this.cartService.addToCart({
      productId,
      quantity,
      price,
      discount,
      cartId,
    });
  }
}
