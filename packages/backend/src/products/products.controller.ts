import { Controller, Get, Query } from '@nestjs/common';
import { FindAllProductsQueryDto } from './dto/find-all-products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() query: FindAllProductsQueryDto) {
    return this.productsService.findAll(query.page, query.limit);
  }
}
