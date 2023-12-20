import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiDeleteTag = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete tag' }),
    ApiOkResponse({
      status: 200,
      description: 'Delete tag successfully',
    }),
    HttpCode(200),
  );
