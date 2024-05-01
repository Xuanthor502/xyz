import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonalDto } from './dto/create-person.dto';
import { Personal } from './entities/person.entity';
import { ResponseMessage } from 'src/decorator/customize';
import { UpdatePersonalDto } from './dto/update-person.dto';



@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}
 
  
  @Post()
  @ResponseMessage('Personal created successfully!')
  async createPersonal(@Body() createPersonalDto: CreatePersonalDto): Promise<Personal> {
    console.log(createPersonalDto)
    return this.peopleService.createPersonal(createPersonalDto);
  }
  
  @Get()
  @ResponseMessage('All Personals retrieved successfully!')
  async findAllPersonal(): Promise<Personal[]> {
    return this.peopleService.findAllPersonal();
  }

  @Get(':id')
  @ResponseMessage('Personal detail retrieved successfully!')
  async findOnePersonal(@Param('id') id: number): Promise<Personal> {
    return this.peopleService.findOnePersonal(id);
  }

  @Patch(':id')
  @ResponseMessage('Personal updated successfully!')
  async updatePersonal(@Param('id') id: number, @Body() updatePersonalDto: UpdatePersonalDto): Promise<Personal> {
    return this.peopleService.updatePersonal(id, updatePersonalDto);
  }

  @Delete(':id')
  @ResponseMessage('Personal removed successfully!')
  async removePersonal(@Param('id') id: number): Promise<void> {
    return this.peopleService.removePersonal(id);
  }
}
