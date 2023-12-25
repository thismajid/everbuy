import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  Post,
  Put,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from 'src/common/services/products.service';
import { GetAllProductsDto } from './dto/get-all-products.dto';
import { DocsPagination } from 'src/common/interfaces/docs-pagination.interface';
import { Product } from '@prisma/client';
import {
  ApiCreateProduct,
  ApiDeleteProduct,
  ApiGetAllProducts,
  ApiGetProductById,
  ApiUpdateProduct,
} from './decorators';
import { CreateProductDto } from 'src/common/types/create-product.type';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  @ApiGetAllProducts()
  async findAll(@Query() query: GetAllProductsDto): Promise<DocsPagination> {
    return this.productsService.findAll({ ...query });
  }

  @Get(':id')
  @ApiGetProductById()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiCreateProduct()
  async create(@Body() data: CreateProductDto): Promise<Product> {
    return this.productsService.create({ ...data });
  }

  @Put(':id')
  @ApiUpdateProduct()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: Product,
  ): Promise<Product | null> {
    return this.productsService.update({ id, product });
  }

  @Delete(':id')
  @ApiDeleteProduct()
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Product | null> {
    return this.productsService.delete({ id });
  }
}
