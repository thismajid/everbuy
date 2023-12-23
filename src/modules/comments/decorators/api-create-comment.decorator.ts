import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/common/types';

export const ApiCreateComment = () =>
  applyDecorators(
    ApiBody({ type: CreateCommentDto }),
    ApiOperation({ summary: 'Create new comment' }),
    ApiOkResponse({
      description: 'Create new comment successfully',
    }),
    HttpCode(201),
  );
