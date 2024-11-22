import { PartialType } from '@nestjs/mapped-types';
import { CreatePilatesDto } from './create-pilates.dto';

export class UpdatePilatesDto extends PartialType(CreatePilatesDto) {}
