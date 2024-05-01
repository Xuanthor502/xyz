import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataProcessingService, HRData, PayrollData } from './data-processing.service';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CreatePersonalDto } from './dto/create-person.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UpdatePersonalDto } from './dto/update-person.dto';
@Injectable()
export class PeoplesService {
  constructor(private dataProcessingService: DataProcessingService
  ) { }
  async create(createPersonalDto: CreatePersonalDto, createEmployeeDto: CreateEmployeeDto) {
    try {
      const hrResponse = await axios.post('http://localhost/api/v1/people', createPersonalDto);
      const payrollResponse = await axios.post('http://localhost/api/v1/employee', createEmployeeDto);

      return {
        hrData: hrResponse.data,
        payrollData: payrollResponse.data,
      };
    } catch (error) {
      const statusCode = error.response ? error.response.status : HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.response ? error.response.data : 'Failed to create data';
      throw new HttpException(message, statusCode);
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const hrApiUrl = 'http://localhost:3002/api/v1/people';
    const payrollApiUrl = 'http://localhost:3001/api/v1/employee';
    
    try {
      const [responseHR, responsePayroll] = await Promise.all([
        axios.get(hrApiUrl),
        axios.get(payrollApiUrl)
      ]);
      //@ts-ignore
      const hrDataArray = responseHR?.data.data;
         //@ts-ignore
      const payrollDataArray = responsePayroll?.data.data;
      let combinedData = this.dataProcessingService.mixDataPersonalHREmployeePayRoll(hrDataArray, payrollDataArray);
      const totalItems = combinedData.length;
      const totalPages = Math.ceil(totalItems / limit);
      const offset = (currentPage - 1) * limit;
      const paginatedData = combinedData.slice(offset, offset + limit);

      return {
        meta: {
          current: currentPage,
          pageSize: limit,
          total: totalItems,
          pages: totalPages,
        },
        result: paginatedData,
      };
    } catch (error) {
      throw new HttpException('Failed to retrieve data', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updatePeopleDto: UpdatePersonalDto, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const hrResponse = await axios.patch(`http://localhost:3002/api/v1/people/${id}`, updatePeopleDto);
      const payrollResponse = await axios.patch(`http://localhost:3001/api/v1/employee/${id}`, updateEmployeeDto);
  
      return {
        hrData: hrResponse.data,
        payrollData: payrollResponse.data,
      };
    } catch (error) {
      const statusCode = error.response ? error.response.status : HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.response ? error.response.data : 'Failed to update data';
      throw new HttpException(message, statusCode);
    }
  }
  
  async remove(id: string) {
    try {
      await Promise.all([
        axios.delete(`http://localhost:3002/api/v1/people/${id}`),
        axios.delete(`http://localhost:3001/api/v1/employee/${id}`)
      ]);
  
      return { message: 'Deleted successfully' };
    } catch (error) {
      const statusCode = error.response ? error.response.status : HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.response ? error.response.data : 'Failed to delete data';
      throw new HttpException(message, statusCode);
    }
  }
  
}
