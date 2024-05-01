import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BenefitService } from './benefit.service';

import { ResponseMessage } from 'src/decorator/customize';
import { Benefit_plan } from './entities/benefit.entity';
import { CreateBenefitPlanDto } from './dto/create-benefit.dto';
import { UpdateBenefitPlanDto } from './dto/update-benefit.dto';

@Controller('benefit')
export class BenefitController {
  constructor(private readonly benefitService: BenefitService) { }

  /*
    Service benefit
  */
  @Post()
  @ResponseMessage("Create Benefit Plan success!")
  async createBenefit(@Body() createBenefitPlanDto: CreateBenefitPlanDto): Promise<Benefit_plan> {
    return this.benefitService.createBenefit(createBenefitPlanDto);
  }

  @Get()
  @ResponseMessage("Get All Benefit Plans success!")
  async getAllBenefit(): Promise<Benefit_plan[]> {
    return this.benefitService.getAllBenefit();
  }
  @ResponseMessage("Get All Benefit Param Plans success!")
  @Get()
  findAll(@Query('current') page: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.benefitService.getAllBenefitParam(pageNumber, limitNumber, qs);
  }

  @Get('/:id')
  @ResponseMessage('Benefit Plan retrieved successfully!')
  async findOneBenefitPlan(@Param('id') id: number): Promise<Benefit_plan> {
    return this.benefitService.findOneBenefitPlan(id);
  }
  @Patch("/:id")
  @ResponseMessage("Update Benefit Plan success!")
  async updateBenefitPlan(
    @Param('id') id: number,
    @Body() updateBenefitPlanDto: UpdateBenefitPlanDto
  ): Promise<Benefit_plan> {
    return this.benefitService.updateBenefitPlan(id, updateBenefitPlanDto);
  }

  @Delete('/:id')
  @ResponseMessage('Benefit Plan removed successfully!')
  async removeBenefitPlan(@Param('id') id: number): Promise<void> {
    return this.benefitService.deleteBenefitPlan(id);
  }
}
