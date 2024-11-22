import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

export class UpdateBalletDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  maxAttendane?: number;
}
