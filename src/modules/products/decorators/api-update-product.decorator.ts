import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiUpdateProduct = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update each product' }),
    ApiOkResponse({
      status: 200,
      description: 'Update each product',
    }),
    HttpCode(200),
  );
