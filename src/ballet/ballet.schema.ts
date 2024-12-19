import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BalletDocument = BalletEntity & Document;

@Schema()
export class BalletEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  maxAttendane: number;

  @Prop({ required: true })
  price: number;
}
export const BalletSchema = SchemaFactory.createForClass(BalletEntity);
