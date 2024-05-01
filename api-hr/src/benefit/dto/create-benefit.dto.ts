import { IsNotEmpty, IsString, IsDate, IsOptional, IsNumber } from 'class-validator';

export class CreateBenefitPlanDto {

    
    Benefit_Plan_ID ?: number;
    @IsString()
    Plan_Name: string;
    @IsNumber()
    Deductable: number;
    @IsNumber()
    Percentage_CoPay: number
}
