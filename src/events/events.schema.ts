import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = EventEntity & Document;

@Schema()
export class EventEntity {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  coachName: string;

  @Prop({ required: true })
  time: string;
}

export const EventSchema = SchemaFactory.createForClass(EventEntity);
