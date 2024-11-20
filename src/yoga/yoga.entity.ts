import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class YogaClass {
  @Prop({ required: true })
  className: string;

  @Prop({ required: true })
  classDate: string;

  @Prop({ required: true })
  classTime: string;

  @Prop({ required: true })
  classDescription: string;

  @Prop({ required: true })
  maxAttendants: number;

  @Prop({ required: true })
  price: number;
}

export type YogaClassDocument = YogaClass & Document;
export const YogaClassSchema = SchemaFactory.createForClass(YogaClass);
