import { IsString, IsBoolean, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrivateClassDto {
  @ApiProperty({
    description: 'The date of the private class',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  readonly date: string;

  @ApiProperty({
    description: 'The starting time of the private class',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly timeFrom: string;

  @ApiProperty({
    description: 'The ending time of the private class',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly timeTo: string;

  @ApiProperty({
    description: 'Indicates if the private class is booked',
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  readonly booked: boolean;
}
