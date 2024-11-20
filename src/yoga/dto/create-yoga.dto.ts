import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateYogaClassDto {
  @IsNotEmpty()
  @IsString()
  className: string;

  @IsNotEmpty()
  @IsString()
  classDate: string;

  @IsNotEmpty()
  @IsString()
  classTime: string;

  @IsNotEmpty()
  @IsString()
  classDescription: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  maxAttendants: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
