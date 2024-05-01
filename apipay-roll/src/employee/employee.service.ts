import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import aqp from 'api-query-params';


@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) { }

  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(createEmployeeDto);
    return createdEmployee.save();
  }

  async findAllEmployee(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }
  async findAllParams(currentPage: number, limit: number, qs: string) {
    const { filter, skip, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.employeeModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.employeeModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: Unreachable code error
      .sort(sort as any)
      .select(projection as any)
      // @ts-ignore: Unreachable code error
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems
      },
      result
    };
  }
  async findOneEmployee(employeeNumber: number): Promise<Employee> {
    return this.employeeModel.findOne({ employeeId: employeeNumber }).exec();
  }

  async updateEmployee(employeeId: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    return this.employeeModel.findOneAndUpdate({ employeeId: employeeId }, updateEmployeeDto, { new: true }).exec();
  }

  async removeEmployee(employeeNumber: number): Promise<void> {
    await this.employeeModel.findOneAndDelete({ employeeId: employeeNumber }).exec();
  }
}
