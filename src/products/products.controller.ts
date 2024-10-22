import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() product: Partial<Product>) {
    return this.productsService.create(product);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() product: Partial<Product>) {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.productsService.delete(id);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return this.productsService.findOneById(id);
  }

  @Get('search')
  async findOneByName(@Query('name') name: string) {
    return this.productsService.findOneByName(name);
  }

  @Get('filter')
  async filterByPrice(@Query('min') min: number, @Query('max') max: number) {
    return this.productsService.filterByPrice(min, max);
  }

  @Get('stock/count')
  async countInStock() {
    return this.productsService.countInStock();
  }
}
