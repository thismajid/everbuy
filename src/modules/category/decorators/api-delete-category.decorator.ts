import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiDeleteCategory = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete category' }),
    ApiOkResponse({
      status: 200,
      description: 'Delete category successfully',
    }),
    HttpCode(200),
  );
