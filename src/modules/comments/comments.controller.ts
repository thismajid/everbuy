import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocsPagination } from 'src/common/interfaces/docs-pagination.interface';
import { CommentsService } from 'src/common/services';
import { GetAllCommentsByProductIdDto } from './dto';
import { ApiGetAllCommentsByProductId } from './decorators';

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
}
