import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { PayrateService } from 'src/payrate/payrate.service';

// export type EmployeeDocument = Document & Employee;
export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({ timestamps: true, versionKey: false })
export class Employee {

  @Prop()
  employeeId: number;

  @Prop()
  lastName: string;

  @Prop()
  firstName: string;

  @Prop()
  SSN: number;
  @Prop()
  birthDay: Date;
  @Prop()
  payRate: string;
    
  @Prop({ type: String, ref: 'PayRate' })
  payRateId: string | Types.ObjectId;

  @Prop()
  vacationDays: number;

  @Prop()
  paidToDate: number;

  @Prop()
  paidLastYear: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
