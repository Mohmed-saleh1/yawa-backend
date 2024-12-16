import { PartialType } from '@nestjs/mapped-types';
import { CreateBalletDto } from './create-ballet.dto';

export class UpdateBalletDto extends PartialType(CreateBalletDto) {}
