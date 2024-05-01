import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Personal } from './people/entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(

    @InjectRepository(Personal) private personalRepository: Repository<Personal>,
    
  ) { }
  async getEmployeeDetails(): Promise<any> {
    
    const data = await this.personalRepository.find({
      relations: ['benefit_plan', 'jobHistory', 'employeeHR'],
    });

    return data;
  }
}
