import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMassageDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  field: string;
}
