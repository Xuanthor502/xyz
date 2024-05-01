import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseMessage } from './decorator/customize';
import { Personal } from './people/entities/person.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ResponseMessage('Get All MixData retrieved successfully!')
  async findAllMixDataPer(): Promise<Personal[]> {
    return this.appService.getEmployeeDetails();
  }  
}
