import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PilatesDocument = PilatesEntity & Document;

@Schema()
export class PilatesEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  maxAttendane: number;
}

export const PilatesSchema = SchemaFactory.createForClass(PilatesEntity);
