import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateEmployeeDto {
  
  @IsNumber()
  employeeId?: number;
  
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  
  @IsNumber()
  SSN?:number

  @IsOptional()
  birthDay?: Date;

  @IsOptional()
  @IsString()
  payRate?: string;
  @IsOptional()
  payRateId?: string;
  @IsOptional()
  @IsNumber()
  vacationDays?: number;
  @IsOptional()
  @IsNumber()
  paidToDate?: number;
  @IsOptional()
  @IsNumber()
  paidLastYear?: number;
}
