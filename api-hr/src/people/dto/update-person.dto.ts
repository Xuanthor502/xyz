import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalDto } from './create-person.dto'; 


export class UpdatePersonalDto extends PartialType(CreatePersonalDto) {}

