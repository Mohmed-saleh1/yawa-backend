import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreatePackageDto {
  @ApiProperty({ description: 'The title of the package' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the package' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The price of the package' })
  @IsNumber()
  price: number;
}
