import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeHRDto } from './dto/create-employee.dto';
import { UpdateEmployeeHRDto } from './dto/update-employee.dto';
import { EmployeeHR } from './entities/employee.entity';
import { Public, ResponseMessage } from 'src/decorator/customize';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }
  @Public()
  @Post()
  @ResponseMessage("Create Employee HR success!")
  async createEmployeeHR(@Body() createEmployeeHRDto: CreateEmployeeHRDto): Promise<EmployeeHR> {
    return this.employeeService.createEmployeeHR(createEmployeeHRDto);
  }
  @Public()
  @Get()
  @ResponseMessage("Get All Employee HRs success!")
  async getAllEmployeeHRs(): Promise<EmployeeHR[]> {
    return this.employeeService.findAllEmployeeHR();
  }

  @Get("/:id")
  @ResponseMessage("Get Employee HR by ID success!")
  async getEmployeeHRById(@Param('id') id: number): Promise<EmployeeHR> {
    return this.employeeService.findOneEmployeeHR(id);
  }

  @Patch("/:id")
  @ResponseMessage("Update Employee HR success!")
  async updateEmployeeHR(
    @Param('id') id: number,
    @Body() updateEmployeeHRDto: UpdateEmployeeHRDto
  ): Promise<EmployeeHR> {
    return this.employeeService.updateEmployeeHR(id, updateEmployeeHRDto);
  }

  @Delete("/:id")
  @ResponseMessage("Remove Employee HR success!")
  async removeEmployeeHR(@Param('id') id: number): Promise<void> {
    return this.employeeService.removeEmployeeHR(id);
  }
}
