import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocsPagination } from 'src/common/interfaces/docs-pagination.interface';
import { CommentsService } from 'src/common/services';
import { GetAllCommentsByProductIdDto } from './dto';
import { ApiCreateComment, ApiGetAllCommentsByProductId } from './decorators';
import { Comment } from '@prisma/client';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('/:productId')
  @ApiGetAllCommentsByProductId()
  async findAll(
    @Param('productId', ParseIntPipe) productId: number,
    @Query() query: GetAllCommentsByProductIdDto,
  ): Promise<DocsPagination> {
    return this.commentsService.findAllByProductId({ ...query, productId });
  }

  @Post('/:productId')
  @ApiCreateComment()
  async create(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() data: Comment,
  ): Promise<Comment> {
    return this.commentsService.create({ ...data, productId });
  }
}
