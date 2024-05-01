import { PartialType } from '@nestjs/mapped-types';
import { CreateBenefitPlanDto } from './create-benefit.dto';


export class UpdateBenefitPlanDto extends PartialType(CreateBenefitPlanDto) {}
