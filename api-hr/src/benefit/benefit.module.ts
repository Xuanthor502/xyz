import { Module } from '@nestjs/common';
import { BenefitService } from './benefit.service';
import { BenefitController } from './benefit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Benefit_plan } from './entities/benefit.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Benefit_plan]),],
  controllers: [BenefitController],
  providers: [BenefitService],
  exports:[BenefitService]
})
export class BenefitModule {}
