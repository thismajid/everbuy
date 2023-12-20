import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiGetProductById = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get each product' }),
    ApiOkResponse({
      status: 200,
      description: 'Fetch each product',
    }),
    HttpCode(200),
  );
