import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateMembershipDto {
  @ApiProperty({ description: 'The title of the membership', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'A description of the membership',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The price of the membership', required: false })
  @IsNumber()
  @IsOptional()
  price?: number;
}
