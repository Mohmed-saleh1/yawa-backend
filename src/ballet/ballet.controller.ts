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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { BalletService } from './ballet.service';
import { CreateBalletDto } from './Dtos/create-ballet.dto';
import { BalletEntity } from './ballet.schema';
import { UpdateBalletDto } from './Dtos/update-ballet-dto';

@ApiTags('Ballet')
@Controller('ballet')
export class BalletController {
  constructor(private readonly balletService: BalletService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Ballet session' })
  @ApiResponse({
    status: 201,
    description: 'The Ballet session has been successfully created.',
    type: BalletEntity,
  })
  @ApiResponse({ status: 400, description: 'Failed to create Ballet session.' })
  @ApiBody({ type: CreateBalletDto })
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
  @ApiOperation({ summary: 'Retrieve all Ballet sessions' })
  @ApiResponse({
    status: 200,
    description: 'A list of Ballet sessions.',
    type: [BalletEntity],
  })
  async findAll(): Promise<BalletEntity[]> {
    return await this.balletService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a Ballet session by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the Ballet session to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'The Ballet session details.',
    type: BalletEntity,
  })
  @ApiResponse({ status: 404, description: 'Ballet session not found.' })
  async findOne(@Param('id') id: string): Promise<BalletEntity> {
    const ballet = await this.balletService.findOne(id);
    if (!ballet) {
      throw new HttpException('Ballet session not found', HttpStatus.NOT_FOUND);
    }
    return ballet;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Ballet session by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the Ballet session to update.',
  })
  @ApiBody({ type: UpdateBalletDto })
  @ApiResponse({
    status: 200,
    description: 'The Ballet session has been successfully updated.',
    type: BalletEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Failed to update Ballet session.',
  })
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
  @ApiOperation({ summary: 'Delete a Ballet session by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the Ballet session to delete.',
  })
  @ApiResponse({
    status: 200,
    description: 'The Ballet session has been successfully deleted.',
    type: BalletEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Failed to delete Ballet session.',
  })
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
