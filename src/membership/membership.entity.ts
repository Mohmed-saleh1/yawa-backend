import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MembershipDocument = MembershipEntity & Document;

@Schema()
export class MembershipEntity {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;
}

export const MembershipSchema = SchemaFactory.createForClass(MembershipEntity);
