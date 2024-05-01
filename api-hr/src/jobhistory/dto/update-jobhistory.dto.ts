import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { CreateJobHistoryDto } from './create-jobhistory.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateJobHistoryDto extends PartialType(CreateJobHistoryDto) {}