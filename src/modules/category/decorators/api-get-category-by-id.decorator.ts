import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiGetCategoryById = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get each category' }),
    ApiOkResponse({
      status: 200,
      description: 'Fetch each category',
    }),
    HttpCode(200),
  );
