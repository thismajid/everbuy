import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateProductDto } from 'src/common/types/create-product.type';

export const ApiCreateProduct = () =>
  applyDecorators(
    ApiBody({ type: CreateProductDto }),
    ApiOperation({ summary: 'Create new product' }),
    ApiOkResponse({
      description: 'Create new product successfully',
    }),
    HttpCode(201),
  );
