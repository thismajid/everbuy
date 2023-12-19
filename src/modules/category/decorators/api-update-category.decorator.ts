import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiUpdateCategory = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update each category' }),
    ApiOkResponse({
      status: 200,
      description: 'Update each category',
    }),
    HttpCode(200),
  );
