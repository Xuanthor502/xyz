import { IsNotEmpty, IsString, IsDate, IsOptional, IsNumber } from 'class-validator';

export class CreateEmployeeHRDto {
  @IsNotEmpty()
  @IsNumber()
  Employee_ID: number;

  @IsNotEmpty()
  @IsString()
  Employment_Status: string;
  @IsOptional()
  Hire_Date?: Date;

  @IsOptional()
  Termination_Date?: Date; 
}
