import { PartialType } from '@nestjs/mapped-types';
import { CreateYogaClassDto } from './create-yoga.dto';

export class UpdateYogaClassDto extends PartialType(CreateYogaClassDto) {}
