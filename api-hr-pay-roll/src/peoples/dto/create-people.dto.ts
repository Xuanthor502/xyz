import { IsNotEmpty, IsBoolean, IsString, IsNumber, IsOptional } from 'class-validator';


export class CreatePeopleDto {
    @IsNotEmpty()
    @IsNumber()
    Employee_ID: number;
    @IsOptional()
    @IsBoolean()
    Gender?: boolean;
    @IsOptional()
    @IsString()
    First_Name?: string;
    @IsOptional()
    @IsString()
    Last_Name?: string;
    @IsOptional()
    @IsString()
    Email?: string;
    @IsOptional()
    @IsString()
    Phone_Number?: string;
    @IsOptional()
    @IsString()
    City?: string;

    @IsNotEmpty()
    @IsBoolean()
    Shareholder_Status: boolean;

    @IsNotEmpty()
    @IsString()
    Ethnicity: string;
    @IsNotEmpty()
    @IsNumber()
    SSN?: number;
    @IsOptional()
    @IsNumber()
    Benefit_Plans?: number;
}
