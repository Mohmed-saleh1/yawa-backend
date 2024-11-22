import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateBalletDto {
  @IsString()
  name: string;

  @IsDateString()
  date: string;

  @IsString()
  time: string;

  @IsString()
  description: string;

  @IsNumber()
  maxAttendane: number;
}
