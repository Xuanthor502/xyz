import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseMessage } from 'src/decorator/customize.decorator';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ResponseMessage('Product successfully created!')
  createProductService(@Body() createProductServiceDto: CreateProductDto) {
    return this.productService.create(createProductServiceDto);
  }

  @ResponseMessage('Product find all params successfully!')
  @Get()
  findAllParams(
    @Query('current') page: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    return this.productService.findAllParams(pageNumber, limitNumber, qs);
  }
  @ResponseMessage('Product find all successfully!')
  @Get()
  findAll() {
    return this.productService.findAll();
  }
  @Get('/:id')
  @ResponseMessage('Product retrieved successfully!')
  findOneProductService(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch()
  @ResponseMessage('Product updated successfully!')
  updateProductService( @Body() updateProductServiceDto:UpdateProductDto) {
    return this.productService.update( updateProductServiceDto);
  }
  
  @Delete('/:id')
  @ResponseMessage('Product removed successfully!')

  removeProductService(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
