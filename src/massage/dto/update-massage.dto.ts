import { PartialType } from '@nestjs/mapped-types';
import { CreateMassageDto } from './create-massage.dto';

export class UpdateMassageDto extends PartialType(CreateMassageDto) {}
