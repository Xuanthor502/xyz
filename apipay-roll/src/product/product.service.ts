import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}


  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }
  findAll() {
    return this.productModel.find();
  }
 async findAllParams(currentPage :number, limit:number , qs : string) {
    const { filter, skip, sort, projection, population } = aqp(qs);


    delete filter.current;
    delete filter.pageSize;
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.productModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result= await this.productModel.find(filter)
    .skip(offset)
    .limit(defaultLimit)
    // @ts-ignore: Unreachable code error
    .sort(sort as any)
    .select(projection as any)
    // @ts-ignore: Unreachable code error
    .populate(population)
    .exec();

    return {
      meta: {
      current: currentPage, 
      pageSize: limit,
      pages: totalPages, 
      total: totalItems 
      },
      result 
      };
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }


  async update(updateProductDto: UpdateProductDto): Promise<Product> {
    const id = updateProductDto._id;
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
  }




