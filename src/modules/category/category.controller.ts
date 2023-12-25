import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import {
  ApiCreateCategory,
  ApiDeleteCategory,
  ApiGetAllCategories,
  ApiGetCategoryById,
  ApiUpdateCategory,
} from './decorators';
import { CategoryService } from 'src/common/services';
import { GetAllCategoriesDto } from './dto';
import { DocsPagination } from 'src/common/interfaces/docs-pagination.interface';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/')
  @ApiGetAllCategories()
  async findAll(@Query() query: GetAllCategoriesDto): Promise<DocsPagination> {
    return this.categoryService.findAll({ ...query });
  }

  @Get(':id')
  @ApiGetCategoryById()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Category | null> {
    return this.categoryService.findOne(+id);
  }

  @Post()
  @ApiCreateCategory()
  async create(@Body() data: Category): Promise<Category> {
    return this.categoryService.create({ ...data });
  }

  @Put(':id')
  @ApiUpdateCategory()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: Category,
  ): Promise<Category | null> {
    return this.categoryService.update({ id, category });
  }

  @Delete(':id')
  @ApiDeleteCategory()
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Category | null> {
    return this.categoryService.delete({ id });
  }
}
