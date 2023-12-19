import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { ApiGetAllCategories, ApiGetCategoryById } from './decorators';
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
}
