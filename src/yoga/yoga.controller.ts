import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { YogaClassService } from './yoga.service';
import { CreateYogaClassDto } from './dto/create-yoga.dto';
import { UpdateYogaClassDto } from './dto/update-yoga.dto';

@Controller('yoga')
export class YogaClassController {
  constructor(private readonly yogaClassService: YogaClassService) {}

  @Post()
  create(@Body() createYogaClassDto: CreateYogaClassDto) {
    return this.yogaClassService.create(createYogaClassDto);
  }

  @Get()
  findAll() {
    return this.yogaClassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.yogaClassService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateYogaClassDto: UpdateYogaClassDto,
  ) {
    return this.yogaClassService.update(id, updateYogaClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yogaClassService.remove(id);
  }
}
