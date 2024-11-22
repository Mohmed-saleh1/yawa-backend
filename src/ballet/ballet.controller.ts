import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BalletService } from './ballet.service';
import { CreateBalletDto } from './Dtos/create-ballet.dto';
import { BalletEntity } from './ballet.schema';
import { UpdateBalletDto } from './Dtos/update-ballet-dto';

@Controller('ballet')
export class BalletController {
  constructor(private readonly balletService: BalletService) {}

  @Post()
  async create(
    @Body() createBalletDto: CreateBalletDto,
  ): Promise<BalletEntity> {
    return await this.balletService.create(createBalletDto);
    throw new HttpException(
      'Failed to create Ballet session',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Get()
  async findAll(): Promise<BalletEntity[]> {
    return await this.balletService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BalletEntity> {
    const ballet = await this.balletService.findOne(id);
    if (!ballet) {
      throw new HttpException('Ballet session not found', HttpStatus.NOT_FOUND);
    }
    return ballet;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBalletDto: UpdateBalletDto,
  ): Promise<BalletEntity> {
    const updated = await this.balletService.update(id, updateBalletDto);
    if (!updated) {
      throw new HttpException(
        'Failed to update Ballet session',
        HttpStatus.NOT_FOUND,
      );
    }
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BalletEntity> {
    const deleted = await this.balletService.remove(id);
    if (!deleted) {
      throw new HttpException(
        'Failed to delete Ballet session',
        HttpStatus.NOT_FOUND,
      );
    }
    return deleted;
  }
}
