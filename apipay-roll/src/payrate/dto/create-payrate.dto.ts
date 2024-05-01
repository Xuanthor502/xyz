import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePayrateDto {

  @IsString()
  @IsOptional()
  _id?: string;
  @IsString()
  Pay_Rate_Name: string;

  @IsNumber()
  Value: number;

  @IsNumber()
  Tax_Percentage: number;

  @IsNumber()
  Pay_Type: number;

  @IsNumber()
  Pay_Amount: number;

  @IsNumber()
  PT_Level_C: number;
}
