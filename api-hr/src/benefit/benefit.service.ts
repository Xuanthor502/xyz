import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import aqp from 'api-query-params';
import { CreateBenefitPlanDto } from './dto/create-benefit.dto';
import { Benefit_plan } from './entities/benefit.entity';
import { UpdateBenefitPlanDto } from './dto/update-benefit.dto';

@Injectable()
export class BenefitService {
  constructor(@InjectRepository(Benefit_plan) private benefitPlanRepository: Repository<Benefit_plan>,) { }
  /*
     Service Benefit
     */

  async createBenefit(createBenefitPlanDto: CreateBenefitPlanDto): Promise<Benefit_plan> {
    const queryRunner = this.benefitPlanRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newBenefitPlan = queryRunner.manager.create(Benefit_plan, createBenefitPlanDto);
      const result = await queryRunner.manager.save(newBenefitPlan);

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getAllBenefit() {
    return this.benefitPlanRepository.find();
    }


  async getAllBenefitParam(currentPage: number, limit: number, qs: string) {
    const { filter, sort } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let offset = (+currentPage - 1) * (+limit);
  
    let queryBuilder = this.benefitPlanRepository.createQueryBuilder('benefit_plan')
                                                    .leftJoinAndSelect('benefit_plan.Employee', 'Employee');
    const intFields = ['Benefit_Plan_ID', 'Deductable', 'Percentage_CoPay'];
    if (sort) {
      Object.entries(sort).forEach(([key, value]) => {
        const [relation, field] = key.includes('.') ? key.split('.') : [null, key];
        const orderByKey = relation ? `${relation}.${field}` : `benefit_plan.${field}`;
        queryBuilder = queryBuilder.addOrderBy(orderByKey, value === 1 ? 'ASC' : 'DESC');
      });
    }  
    const [result, totalItems] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();
  
    const totalPages = Math.ceil(totalItems / (+limit));
    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        total: totalItems,
        pages: totalPages,
      },
      result,
    };
  }

  async findOneBenefitPlan(Benefit_Plan_ID: number): Promise<Benefit_plan> {
    const benefitPlan = await this.benefitPlanRepository.findOneBy({ Benefit_Plan_ID });
    return benefitPlan;
  }

  async updateBenefitPlan(Benefit_Plan_ID:number, updateBenefitPlanDto: UpdateBenefitPlanDto): Promise<Benefit_plan> {
    const queryRunner = this.benefitPlanRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const benefitPlan = await queryRunner.manager.findOne(Benefit_plan, { where: { Benefit_Plan_ID } });
      if (!benefitPlan) {
        throw new Error(`BenefitPlan with Benefit_Plan_ID ${Benefit_Plan_ID} not found`);
      }

      queryRunner.manager.merge(Benefit_plan, benefitPlan, updateBenefitPlanDto);
      const result = await queryRunner.manager.save(benefitPlan);

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }


  async deleteBenefitPlan(Benefit_Plan_ID: number): Promise<void> {

    const queryRunner = this.benefitPlanRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager.delete(Benefit_plan, { Benefit_Plan_ID });
      if (result.affected === 0) {
        throw new Error(`BenefitPlan with Benefit_Plan_ID ${Benefit_Plan_ID} not found or already removed`);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

}
