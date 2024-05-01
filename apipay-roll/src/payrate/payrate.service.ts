import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import aqp from 'api-query-params';
import { PayRate } from './entities/payrate.entity';
import { CreatePayrateDto } from './dto/create-payrate.dto';
import { UpdatePayrateDto } from './dto/update-payrate.dto';


@Injectable()
export class PayrateService {
  constructor(@InjectModel(PayRate.name) private payRateModel: Model<PayRate>) {}

  async createPayRate(createPayRateDto: CreatePayrateDto): Promise<PayRate> {
    const createdPayRate = new this.payRateModel(createPayRateDto);
    return createdPayRate.save();
  }

  async findAll()
  {
    return this.payRateModel.find();
  }
  async findAllPayRate(currentPage :number, limit:number , qs : string){
      const { filter, skip, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.payRateModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result= await this.payRateModel.find(filter)
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

  async findOnePayRate(id: string): Promise<PayRate> {
    return this.payRateModel.findById(id).exec();
  }

  async updatePayRate( updatePayRateDto: UpdatePayrateDto): Promise<PayRate> {
    const id = updatePayRateDto._id;
    console.log(updatePayRateDto)
    console.log(id);
    return this.payRateModel.findByIdAndUpdate(id, updatePayRateDto, { new: true }).exec();
  }

  async removePayRate(id: string): Promise<PayRate> {
    return this.payRateModel.findByIdAndDelete(id).exec();
  }
}
