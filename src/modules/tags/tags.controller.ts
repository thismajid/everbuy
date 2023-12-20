import { Controller, Get, Query } from '@nestjs/common';
import { DocsPagination } from 'src/common/interfaces/docs-pagination.interface';
import { TagsService } from 'src/common/services';
import { GetAllTagsDto } from './dto/get-all-tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get('/')
  async findAll(@Query() query: GetAllTagsDto): Promise<DocsPagination> {
    return this.tagsService.findAll({ ...query });
  }
}
