import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeHRDto } from './create-employee.dto';

export class UpdateEmployeeHRDto extends PartialType(CreateEmployeeHRDto) {}
