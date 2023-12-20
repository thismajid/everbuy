import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { DocsPagination } from 'src/common/interfaces/docs-pagination.interface';
import { TagsService } from 'src/common/services';
import { GetAllTagsDto } from './dto/get-all-tags.dto';
import { Tag } from '@prisma/client';
import {
  ApiCreateTag,
  ApiDeleteTag,
  ApiGetAllTags,
  ApiGetTagById,
  ApiUpdateTag,
} from './decorators';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get('/')
  @ApiGetAllTags()
  async findAll(@Query() query: GetAllTagsDto): Promise<DocsPagination> {
    return this.tagsService.findAll({ ...query });
  }

  @Get(':id')
  @ApiGetTagById()
  async findOne(@Param('id') id: string): Promise<Tag | null> {
    return this.tagsService.findOne(+id);
  }

  @Post('/')
  @ApiCreateTag()
  async create(@Body() data: Tag): Promise<Tag> {
    return this.tagsService.create({ ...data });
  }

  @Put(':id')
  @ApiUpdateTag()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() tag: Tag,
  ): Promise<Tag | null> {
    return this.tagsService.update({ id, tag });
  }

  @Delete(':id')
  @ApiDeleteTag()
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Tag | null> {
    return this.tagsService.delete({ id });
  }
}
