import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PrivateClassDocument = PrivateClassEntity & Document;

@Schema()
export class PrivateClassEntity {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  timeFrom: string;

  @Prop({ required: true })
  timeTo: string;

  @Prop({ required: true })
  booked: boolean;
}

export const PrivateClassSchema =
  SchemaFactory.createForClass(PrivateClassEntity);
