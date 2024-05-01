import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ResponseMessage } from 'src/decorator/customize.decorator';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';


@Controller('employee')
export class EmployeeController {
  constructor(private readonly EmployeeService: EmployeeService) {}

  /*
    Service employee
  */
   
    @Post()
    @ResponseMessage('Employee Pay Roll created successfully!')
    createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
      return this.EmployeeService.createEmployee(createEmployeeDto);
    }
    
    @Get()
    @ResponseMessage('All Employee Pay Rolls retrieved successfully!')
    findAllEmployee() {
      return this.EmployeeService.findAllEmployee();
    }
    @ResponseMessage('Product find all params successfully!')
    @Get()
    findAllParams(
      @Query('current') page: string,
      @Query('pageSize') limit: string,
      @Query() qs: string,
    ) {
      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = parseInt(limit, 10) || 10;
  
      return this.EmployeeService.findAllParams(pageNumber, limitNumber, qs);
    }
    @Get('/:Employee_Number')
    @ResponseMessage('Employee Pay Roll retrieved successfully!')
    findOneEmployee(@Param('Employee_Number') Employee_Number: string) {
      return this.EmployeeService.findOneEmployee(+Employee_Number);
    }
    
    @Patch('/:Employee_Number')
    @ResponseMessage('Employee Pay Roll updated successfully!')
    updateEmployee(@Param('Employee_Number') Employee_Number: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
      return this.EmployeeService.updateEmployee(+Employee_Number, updateEmployeeDto);
    }
  
    @Delete('/:Employee_Number')
    @ResponseMessage('Employee Pay Roll removed successfully!')
    removeEmployee(@Param('Employee_Number') Employee_Number: string) {
      return this.EmployeeService.removeEmployee(+Employee_Number);
    }
}
