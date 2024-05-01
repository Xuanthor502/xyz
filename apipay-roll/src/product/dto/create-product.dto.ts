import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {

  _id?: string;
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  imgURL?: string;
}
