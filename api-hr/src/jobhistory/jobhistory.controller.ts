import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobhistoryService } from './jobhistory.service';
import { CreateJobHistoryDto } from './dto/create-jobhistory.dto'; 
import { UpdateJobHistoryDto } from './dto/update-jobhistory.dto'; 
import { JobHistory } from './entities/jobhistory.entity'; 
import { Public, ResponseMessage } from 'src/decorator/customize';


@Controller('jobhistory')
export class JobhistoryController {
  constructor(private readonly jobhistoryService: JobhistoryService,
    ) {}

  /*
    Service jobhistory
  */  @Public()
    @Post()
    @ResponseMessage("Create Job History success!")
    async createJobHistory(@Body() createJobHistoryDto: CreateJobHistoryDto): Promise<JobHistory> {
   
      return this.jobhistoryService.createJobHistory(createJobHistoryDto);
    }
    @Public()
    @Get()
    @ResponseMessage("Get All Job Histories success!")
    async getAllJobHistories(): Promise<JobHistory[]> {
      return this.jobhistoryService.getAllJobHistories();
    }

    @ResponseMessage("Get All Benefit Param Plans success!")
  @Get()
  findAll(@Query('current') page: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.jobhistoryService.getAllJobHistoriesParam(pageNumber, limitNumber, qs);
  }
    @Public()
    @Get("/:id")
    @ResponseMessage("Get Job History by ID success!")
    async getJobHistoryById(@Param('id') id: number): Promise<JobHistory[]> {
      return this.jobhistoryService.findOneJobHistoryByID(id);
    }
    @Public()
    @Patch("/:id")
    @ResponseMessage("Update Job History success!")
    async updateJobHistory(
      @Param('id') id: number,
      @Body() updateJobHistoryDto: UpdateJobHistoryDto
    ): Promise<JobHistory> {
      return this.jobhistoryService.updateJobHistory(id, updateJobHistoryDto);
    }
    @Public()
    @Delete('/:id')
    @ResponseMessage('JobHistory removed successfully!')
    async removejobhistory(@Param('id') id: number): Promise<void> {
      return this.jobhistoryService.removeJobHistoryByID(id);
    }
}
