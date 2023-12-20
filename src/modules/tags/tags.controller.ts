import { Controller, Get, Param, Query } from '@nestjs/common';
import { DocsPagination } from 'src/common/interfaces/docs-pagination.interface';
import { TagsService } from 'src/common/services';
import { GetAllTagsDto } from './dto/get-all-tags.dto';
import { Tag } from '@prisma/client';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get('/')
  async findAll(@Query() query: GetAllTagsDto): Promise<DocsPagination> {
    return this.tagsService.findAll({ ...query });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tag | null> {
    return this.tagsService.findOne(+id);
  }
}
