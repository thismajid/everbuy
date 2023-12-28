import { HttpCode, UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards';
import { AddToCartDto } from 'src/common/types';

export const ApiAddToCart = () =>
  applyDecorators(
    ApiBody({ type: AddToCartDto }),
    ApiOperation({ summary: 'Add to cart' }),
    ApiOkResponse({
      description: 'Add to cart successfully',
    }),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard),
    HttpCode(201),
  );
