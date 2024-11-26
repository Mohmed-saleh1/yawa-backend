import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { MassageService } from './massage.service';
import { CreateMassageDto } from './dto/create-massage.dto';
import { UpdateMassageDto } from './dto/update-massage.dto';
import { MassageEntity } from './massage.entity';

@ApiTags('Massages') // Group all endpoints under the "Massages" section
@Controller('massages')
export class MassageController {
  constructor(private readonly massageService: MassageService) {}

  // Create a new massage
  @Post()
  @ApiOperation({ summary: 'Create a new massage' })
  @ApiResponse({
    status: 201,
    description: 'The massage has been successfully created.',
    type: MassageEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(
    @Body() createMassageDto: CreateMassageDto,
  ): Promise<MassageEntity> {
    return this.massageService.create(createMassageDto);
  }

  // Retrieve all massages
  @Get()
  @ApiOperation({ summary: 'Retrieve all massages' })
  @ApiResponse({
    status: 200,
    description: 'A list of massages has been retrieved successfully.',
    type: [MassageEntity],
  })
  async findAll(): Promise<MassageEntity[]> {
    return this.massageService.findAll();
  }

  // Retrieve a single massage by ID
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single massage by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the massage', type: String })
  @ApiResponse({
    status: 200,
    description: 'The massage has been retrieved successfully.',
    type: MassageEntity,
  })
  @ApiResponse({ status: 404, description: 'Massage not found.' })
  async findOne(@Param('id') id: string): Promise<MassageEntity> {
    return this.massageService.findOne(id);
  }

  // Update a massage by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update a massage by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the massage to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The massage has been successfully updated.',
    type: MassageEntity,
  })
  @ApiResponse({ status: 404, description: 'Massage not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateMassageDto: UpdateMassageDto,
  ): Promise<MassageEntity> {
    return this.massageService.update(id, updateMassageDto);
  }

  // Delete a massage by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a massage by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the massage to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The massage has been successfully deleted.',
    type: MassageEntity,
  })
  @ApiResponse({ status: 404, description: 'Massage not found.' })
  async remove(@Param('id') id: string): Promise<MassageEntity> {
    return this.massageService.remove(id);
  }
}
