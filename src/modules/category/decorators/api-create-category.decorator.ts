import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateCategoryDto } from 'src/common/types/create-category.type';

export const ApiCreateCategory = () =>
  applyDecorators(
    ApiBody({ type: CreateCategoryDto }),
    ApiOperation({ summary: 'Create new category' }),
    ApiOkResponse({
      description: 'Create new category successfully',
    }),
    HttpCode(201),
  );
