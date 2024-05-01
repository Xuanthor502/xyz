import { IsNotEmpty, IsBoolean, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePersonalDto {
  @IsNotEmpty()
  @IsNumber()
  Employee_ID: number;

  @IsBoolean()
  Gender?: boolean;
  @IsString()
  First_Name?: string;
  @IsString()
  Last_Name?: string;
  @IsString()
  Ethnicity?: string;
  @IsString()
  Email?: string;
  @IsString()
  Phone_Number?: string;
  @IsString()
  City?: string;
  @IsNotEmpty()
  @IsBoolean()
  Shareholder_Status: boolean;
  @IsOptional()
  @IsNumber()
  Benefit_Plans?: number; // Đánh dấu là tùy chọn vì không phải lúc nào bạn cũng cần liên kết với Benefit_plan khi tạo Personal



}
