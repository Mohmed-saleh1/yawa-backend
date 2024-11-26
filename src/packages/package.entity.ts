import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PackageDocument = PackageEntity & Document;

@Schema()
export class PackageEntity {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;
}

export const PackageSchema = SchemaFactory.createForClass(PackageEntity);
