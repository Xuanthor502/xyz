import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

// export type PayRatesDocument = Document & PayRates;
export type PayRatesDocument = HydratedDocument<PayRate>;

@Schema({ timestamps: true, versionKey: false })
export class PayRate {
  @Prop()
  Pay_Rate_Name: string;

  @Prop()
  Value: number;

  @Prop()
  Tax_Percentage: number;

  @Prop()
  Pay_Type: number;

  @Prop()
  Pay_Amount: number;

  @Prop()
  PT_Level_C: number;
}

export const PayRatesSchema = SchemaFactory.createForClass(PayRate);
