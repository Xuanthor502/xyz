import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personal } from './entities/person.entity';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [TypeOrmModule.forFeature([Personal]), EmployeeModule],
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [PeopleService]
})
export class PeopleModule {}
