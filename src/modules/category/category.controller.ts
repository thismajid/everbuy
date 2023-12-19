import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import {
  ApiCreateCategory,
  ApiGetAllCategories,
  ApiGetCategoryById,
} from './decorators';
import { CategoryService } from 'src/common/services';
import { GetAllCategoriesDto } from './dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/')
  @ApiGetAllCategories()
  async findAll(@Query() query: GetAllCategoriesDto): Promise<Category[]> {
    return this.categoryService.findAll({ ...query });
  }

  @Get(':id')
  @ApiGetCategoryById()
  async findOne(@Param('id') id: string): Promise<Category | null> {
    return this.categoryService.findOne(+id);
  }

  @Post()
  @ApiCreateCategory()
  async create(@Body() data: Category): Promise<Category> {
    return this.categoryService.create({ ...data });
  }
}
