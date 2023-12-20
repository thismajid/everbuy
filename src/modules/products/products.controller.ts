import { Controller, Get, Query, Param, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from 'src/common/services/products.service';
import { GetAllProductsDto } from './dto/get-all-products.dto';
import { DocsPagination } from 'src/common/interfaces/docs-pagination.interface';
import { Product } from '@prisma/client';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  async findAll(@Query() query: GetAllProductsDto): Promise<DocsPagination> {
    return this.productsService.findAll({ ...query });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.findOne(+id);
  }

  @Post()
  async create(@Body() data: Product): Promise<Product> {
    return this.productsService.create({ ...data });
  }
}
