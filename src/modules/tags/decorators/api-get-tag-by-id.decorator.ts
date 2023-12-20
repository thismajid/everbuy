import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiGetTagById = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get each tag' }),
    ApiOkResponse({
      status: 200,
      description: 'Fetch each tag',
    }),
    HttpCode(200),
  );
