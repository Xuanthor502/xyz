import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsDate, MinDate, IsOptional } from 'class-validator';
import { Column } from 'typeorm';



export class CreateJobHistoryDto {

  ID?: number;

  @IsNotEmpty()
  @IsNumber()
  Employee_ID: number;

  @IsString()
  Department: string;

  @IsNumber()
  Departmen_Code: number;

  @IsString()
  Division: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  Start_Date: Date;
  @Transform(({ value }) => new Date(value))
  @IsDate()
  End_Date: Date;

  @IsString()
  Job_Title: string;


  @IsString()
  Job_Category: string;

  @IsNumber()
  Supervisor: number;

  @IsString()
  Location: string;

  @IsNumber()
  Salary_Type: number;

  @IsString()
  Pay_Period: string

  @IsNumber()
  Hours_per_Week: number;

  @IsBoolean()
  Hazardous_Training: boolean;
}

