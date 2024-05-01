import { Injectable } from '@nestjs/common';
import { CreateEmployeeHRDto } from './dto/create-employee.dto';
import { UpdateEmployeeHRDto } from './dto/update-employee.dto';
import { EmployeeHR } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(@InjectRepository(EmployeeHR) private EmployeeHR: Repository<EmployeeHR>,) { }
  /*
      Service EmployeeHR
      */
  async createEmployeeHR(createEmployeeHRDto: CreateEmployeeHRDto): Promise<EmployeeHR> {
    const queryRunner = this.EmployeeHR.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newEmployeeHR = queryRunner.manager.create(EmployeeHR, createEmployeeHRDto);
      const result = await queryRunner.manager.save(newEmployeeHR);

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }


  async findAllEmployeeHR(): Promise<EmployeeHR[]> {
    return await this.EmployeeHR.find();
  }

  async findOneEmployeeHR(id: number): Promise<EmployeeHR> {
    const employeeHR = await this.EmployeeHR.findOneBy({ Employee_ID: id });

    // if (!employeeHR) {
    //   throw new Error(`EmployeeHR with Employee_ID ${id} not found`);
    // }

    return employeeHR;
  }


  async updateEmployeeHR(id: number, updateEmployeeHRDto: UpdateEmployeeHRDto): Promise<EmployeeHR> {
    const queryRunner = this.EmployeeHR.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const employeeHR = await queryRunner.manager.findOne(EmployeeHR, { where: { Employee_ID: id } });
      if (!employeeHR) {
        throw new Error(`EmployeeHR with Employee_ID ${id} not found`);
      }

      queryRunner.manager.merge(EmployeeHR, employeeHR, updateEmployeeHRDto);
      const result = await queryRunner.manager.save(employeeHR);

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }



  async removeEmployeeHR(id: number): Promise<void> {
    const queryRunner = this.EmployeeHR.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager.delete(EmployeeHR, { Employee_ID: id });
      // if (result.affected === 0) {
      //   throw new Error(`EmployeeHR with Employee_ID ${id} not found or already removed`);
      // }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

}
