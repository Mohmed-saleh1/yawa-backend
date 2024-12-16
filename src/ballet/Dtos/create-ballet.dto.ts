import { IsString, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBalletDto {
  @ApiProperty({
    description: 'Name of the Ballet session',
    example: 'Beginner Ballet',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Date of the Ballet session (in ISO format)',
    example: '2024-12-20',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Time of the Ballet session',
    example: '09:00 AM',
  })
  @IsString()
  time: string;

  @ApiProperty({
    description: 'Description of the Ballet session',
    example: 'A beginner-level ballet session focusing on basic techniques.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Maximum attendance allowed for the session',
    example: 20,
  })
  @IsNumber()
  maxAttendane: number;

  @ApiProperty({
    description: 'Price of the Ballet session',
    example: 50.0,
  })
  @IsNotEmpty()
  price: number;
}
