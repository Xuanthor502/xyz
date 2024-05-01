import { PartialType } from '@nestjs/mapped-types';
import { CreatePayrateDto } from './create-payrate.dto';

export class UpdatePayrateDto extends PartialType(CreatePayrateDto) {}
