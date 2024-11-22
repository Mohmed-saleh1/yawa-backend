import { PartialType } from '@nestjs/mapped-types';
import { CreatePrivateClassDto } from './create-private-class.dto';

export class UpdatePrivateClassDto extends PartialType(CreatePrivateClassDto) {}
