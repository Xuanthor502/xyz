import { Module } from '@nestjs/common';
import { PeoplesService } from './peoples.service';
import { PeoplesController } from './peoples.controller';
import { DataProcessingService } from './data-processing.service';

@Module({
  controllers: [PeoplesController],
  providers: [PeoplesService,DataProcessingService],
})
export class PeoplesModule {}
