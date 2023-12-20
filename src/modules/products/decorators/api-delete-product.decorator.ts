import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiDeleteProduct = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete product' }),
    ApiOkResponse({
      status: 200,
      description: 'Delete product successfully',
    }),
    HttpCode(200),
  );
