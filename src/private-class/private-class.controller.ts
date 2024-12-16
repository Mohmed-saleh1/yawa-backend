import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrivateClassService } from './private-class.service';
import { CreatePrivateClassDto } from './dto/create-private-class.dto';
import { UpdatePrivateClassDto } from './dto/update-private-class.dto';

@Controller('private-class')
export class PrivateClassController {
  constructor(private readonly privateClassService: PrivateClassService) {}

  @Post('time')
  async create(@Body() createPrivateClassDto: CreatePrivateClassDto) {
    try {
      return await this.privateClassService.create(createPrivateClassDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create private class',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('time')
  async findAll() {
    return this.privateClassService.findAll();
  }

  @Get('time/:id')
  async findOne(@Param('id') id: string) {
    return this.privateClassService.findOne(id);
  }

  @Put('time/:id')
  async update(
    @Param('id') id: string,
    @Body() updatePrivateClassDto: UpdatePrivateClassDto,
  ) {
    try {
      return await this.privateClassService.update(id, updatePrivateClassDto);
    } catch (error) {
      throw new HttpException(
        'Failed to update private class',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('time/:id')
  async remove(@Param('id') id: string) {
    try {
      return await this.privateClassService.remove(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete private class',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
