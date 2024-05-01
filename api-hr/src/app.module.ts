import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { BenefitModule } from './benefit/benefit.module';
import { JobhistoryModule } from './jobhistory/jobhistory.module';
import { PeopleModule } from './people/people.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personal } from './people/entities/person.entity';
import { JobHistory } from './jobhistory/entities/jobhistory.entity';
import { Benefit_plan } from './benefit/entities/benefit.entity';
import { EmployeeHR } from './employee/entities/employee.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mssql',
          host: configService.get<string>('MSSQL_HOST'),
          port: parseInt(configService.get<string>('MSSQL_PORT'), 10),
          username: configService.get<string>('MSSQL_USERNAME'),
          password: configService.get<string>('MSSQL_PASSWORD'),
          database: configService.get<string>('MSSQL_DATABASE'),
          options: {
            encrypt: true,
            trustServerCertificate: true,
          },
          entities: [Personal, JobHistory, EmployeeHR, Benefit_plan],
          synchronize: false,
          // logging: ['query', 'error'],
        };
      },
    }),
    TypeOrmModule.forFeature([Personal, JobHistory, Benefit_plan, EmployeeHR]), EmployeeModule, BenefitModule, JobhistoryModule, PeopleModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule { }
