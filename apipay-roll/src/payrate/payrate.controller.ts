import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PayrateService } from './payrate.service';
import { ResponseMessage } from 'src/decorator/customize.decorator';
import { CreatePayrateDto } from './dto/create-payrate.dto';
import { UpdatePayrateDto } from './dto/update-payrate.dto';


@Controller('PayRoll/payRate')
export class PayrateController {
  constructor(private readonly payrateService: PayrateService) { }
  /*
     Service payRate
   */
  
  @Post()
  @ResponseMessage('Pay Rate successfully created!')
  createPayRate(@Body() createPayRateDto: CreatePayrateDto) {
    return this.payrateService.createPayRate(createPayRateDto);
  }

  
  @Get()
  @ResponseMessage('Pay Rate find all successfully!')
  findAllParams(
    @Query('current') page: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    return this.payrateService.findAllPayRate(pageNumber,limitNumber,qs);
  }
  @Get()
  @ResponseMessage('Pay Rate find all successfully!')
  findAll() { return this.payrateService.findAll(); }
  
  @Get('/:id')
  @ResponseMessage('Pay Rate retrieved successfully!')
  findOnePayRate(@Param('id') id: string) {
    return this.payrateService.findOnePayRate(id);
  }
  
  @Patch()
  @ResponseMessage('Pay Rate updated successfully!')
  updatePayRate(@Body() updatePayRateDto: UpdatePayrateDto) {
    return this.payrateService.updatePayRate(updatePayRateDto);
  }
  
  @Delete('/:id')
  @ResponseMessage('Pay Rate removed successfully!')
  removePayRate(@Param('id') id: string) {
    return this.payrateService.removePayRate(id);
  }

}
