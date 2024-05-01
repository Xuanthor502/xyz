import { Module } from '@nestjs/common';
import { PayrateService } from './payrate.service';
import { PayrateController } from './payrate.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { PayRate, PayRatesSchema } from './entities/payrate.entity';

@Module({
  imports:[ MongooseModule.forFeature([{ name: PayRate.name, schema: PayRatesSchema }])],
  controllers: [PayrateController],
  providers: [PayrateService],
  exports:[PayrateService]
})
export class PayrateModule {}
