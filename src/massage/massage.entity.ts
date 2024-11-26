import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type MassageDocument = MassageEntity & Document;

@Schema()
export class MassageEntity {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  field: string;
}

export const MassageSchema = SchemaFactory.createForClass(MassageEntity);
