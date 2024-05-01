import { Module } from '@nestjs/common';
import { JobhistoryService } from './jobhistory.service';
import { JobhistoryController } from './jobhistory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobHistory } from './entities/jobhistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobHistory]),],
  controllers: [JobhistoryController],
  providers: [JobhistoryService],
  exports: [JobhistoryService]
})
export class JobhistoryModule {}
