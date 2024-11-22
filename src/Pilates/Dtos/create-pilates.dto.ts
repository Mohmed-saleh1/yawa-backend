import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreatePilatesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  maxAttendane: number;
}
