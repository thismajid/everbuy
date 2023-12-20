import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from 'src/common/services/products.service';
import { GetAllProductsDto } from './dto/get-all-products.dto';
import { DocsPagination } from 'src/common/interfaces/docs-pagination.interface';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  async findAll(@Query() query: GetAllProductsDto): Promise<DocsPagination> {
    return this.productsService.findAll({ ...query });
  }
}
