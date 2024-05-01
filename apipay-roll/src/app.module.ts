import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { PayrateModule } from './payrate/payrate.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URI')
    }),
    inject: [ConfigService],
  }),
  ConfigModule.forRoot({
    isGlobal:true
  }),
  EmployeeModule,
  PayrateModule,
  ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
