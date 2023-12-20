import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateTagDto } from 'src/common/types/create-tag.type';

export const ApiCreateTag = () =>
  applyDecorators(
    ApiBody({ type: CreateTagDto }),
    ApiOperation({ summary: 'Create new tag' }),
    ApiOkResponse({
      description: 'Create new tag successfully',
    }),
    HttpCode(201),
  );
