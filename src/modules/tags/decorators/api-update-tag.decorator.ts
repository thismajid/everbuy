import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiUpdateTag = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update each tag' }),
    ApiOkResponse({
      status: 200,
      description: 'Update each tag',
    }),
    HttpCode(200),
  );
