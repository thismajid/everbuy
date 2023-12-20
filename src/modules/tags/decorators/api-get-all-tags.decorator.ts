import {
  HttpCode,
  UsePipes,
  ValidationPipe,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';

export const ApiGetAllTags = () =>
  applyDecorators(
    ApiQuery({
      name: 'limit',
      type: String,
      required: false,
      schema: { default: 10 },
    }),
    ApiQuery({
      name: 'page',
      type: String,
      required: false,
      schema: { default: 1 },
    }),
    ApiOperation({ summary: 'Get and filter all tags' }),
    ApiOkResponse({
      status: 200,
      description: 'Fetch all tags',
    }),
    HttpCode(200),
    ApiBearerAuth(),
    UsePipes(new ValidationPipe({ transform: true })),
  );
