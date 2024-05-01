import { Controller, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Get, Query } from '@nestjs/common';
import { PeoplesService } from './peoples.service';
import { CreatePersonalDto } from './dto/create-person.dto';
import { CreatePeopleDto } from './dto/create-people.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';


@Controller('people')
export class PeoplesController {
  constructor(private readonly peoplesService: PeoplesService) { }

  @Post()
  async create(@Body() createPersonalDto: CreatePeopleDto) {
    try {
      const createPeopleDto = this.mapToCreatePeopleDto(createPersonalDto);
      const createEmployeeDto = this.mapToCreateEmployeeDto(createPersonalDto);

      return await this.peoplesService.create(createPeopleDto, createEmployeeDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }
  @Get()
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.peoplesService.findAll(+currentPage, +limit, qs);
  }

  @Patch()
  async update(@Body() updatePersonalDto: CreatePeopleDto) {
    try {
      const updatePeopleDto = this.mapToCreatePeopleDto(updatePersonalDto);
      const updateEmployeeDto = this.mapToCreateEmployeeDto(updatePersonalDto);
      let id = updatePersonalDto.Employee_ID;
      return await this.peoplesService.update(id, updatePeopleDto, updateEmployeeDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.peoplesService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  private mapToCreatePeopleDto(personalDto: CreatePeopleDto): CreatePeopleDto {
    return {
      Employee_ID: personalDto.Employee_ID,
      Gender: personalDto.Gender,
      First_Name: personalDto.First_Name,
      Last_Name: personalDto.Last_Name,
      Email: personalDto.Email,
      Phone_Number: personalDto.Phone_Number,
      City: personalDto.City,
      Shareholder_Status: personalDto.Shareholder_Status,
      Ethnicity: personalDto.Ethnicity,
      Benefit_Plans: personalDto.Benefit_Plans,
    };
  }

  private mapToCreateEmployeeDto(personalDto: CreatePeopleDto): CreateEmployeeDto {
    return {
      employeeId: personalDto.Employee_ID,
      firstName: personalDto.First_Name,
      lastName: personalDto.Last_Name,
      SSN: personalDto.SSN,
      payRate: null,
      payRateId: null,
      vacationDays: null,
      paidToDate: null,
      paidLastYear: null,
    };
  }
}
