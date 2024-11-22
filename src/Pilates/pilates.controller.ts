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
import { PilatesService } from './pilates.service';
import { CreatePilatesDto } from './Dtos/create-pilates.dto';
import { UpdatePilatesDto } from './Dtos/update-pilates.dto';
import { PilatesEntity } from './pilates.schema';

@Controller('pilates')
export class PilatesController {
  constructor(private readonly pilatesService: PilatesService) {}

  @Post()
  async create(
    @Body() createPilatesDto: CreatePilatesDto,
  ): Promise<PilatesEntity> {
    return await this.pilatesService.create(createPilatesDto);
  }

  @Get()
  async findAll(): Promise<PilatesEntity[]> {
    return await this.pilatesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PilatesEntity> {
    const pilates = await this.pilatesService.findOne(id);
    if (!pilates) {
      throw new HttpException(
        'Pilates session not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return pilates;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePilatesDto: UpdatePilatesDto,
  ): Promise<PilatesEntity> {
    const updated = await this.pilatesService.update(id, updatePilatesDto);
    if (!updated) {
      throw new HttpException(
        'Failed to update Pilates session',
        HttpStatus.NOT_FOUND,
      );
    }
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PilatesEntity> {
    const deleted = await this.pilatesService.remove(id);
    if (!deleted) {
      throw new HttpException(
        'Failed to delete Pilates session',
        HttpStatus.NOT_FOUND,
      );
    }
    return deleted;
  }
}
