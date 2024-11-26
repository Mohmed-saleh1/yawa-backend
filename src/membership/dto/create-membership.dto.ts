import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateMembershipDto {
  @ApiProperty({ description: 'The title of the membership' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'A description of the membership' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The price of the membership' })
  @IsNumber()
  price: number;
}
