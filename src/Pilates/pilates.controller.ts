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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Pilates')
@Controller('pilates')
export class PilatesController {
  constructor(private readonly pilatesService: PilatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Pilates session' })
  @ApiResponse({
    status: 201,
    description: 'The Pilates session has been successfully created.',
    type: PilatesEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({
    description: 'Details of the Pilates session to create',
    required: true,
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of the session',
          example: 'Morning Pilates',
        },
        date: {
          type: 'string',
          description: 'Date of the session',
          example: '2024-12-20',
        },
        time: {
          type: 'string',
          description: 'Time of the session',
          example: '09:00 AM',
        },
        description: {
          type: 'string',
          description: 'Description of the session',
          example: 'A relaxing morning Pilates session.',
        },
        maxAttendane: {
          type: 'integer',
          description: 'Maximum number of attendees',
          example: 15,
        },
        price: {
          type: 'number',
          description: 'Price per attendee',
          example: 20,
        },
      },
      required: [
        'name',
        'date',
        'time',
        'description',
        'maxAttendane',
        'price',
      ],
    },
  })
  async create(
    @Body() createPilatesDto: CreatePilatesDto,
  ): Promise<PilatesEntity> {
    return await this.pilatesService.create(createPilatesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all Pilates sessions' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all sessions.',
    type: [PilatesEntity],
  })
  async findAll(): Promise<PilatesEntity[]> {
    return await this.pilatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific Pilates session by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the session.',
    type: PilatesEntity,
  })
  @ApiResponse({ status: 404, description: 'Pilates session not found.' })
  @ApiParam({
    name: 'id',
    description: 'ID of the Pilates session',
    example: '1',
  })
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
  @ApiOperation({ summary: 'Update an existing Pilates session' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the session.',
    type: PilatesEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Failed to update Pilates session.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the Pilates session',
    example: '1',
  })
  @ApiBody({
    description: 'Details of the Pilates session to update',
    required: true,
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Updated name of the session',
          example: 'Evening Pilates',
        },
        date: {
          type: 'string',
          description: 'Updated date of the session',
          example: '2024-12-21',
        },
        time: {
          type: 'string',
          description: 'Updated time of the session',
          example: '07:00 PM',
        },
        description: {
          type: 'string',
          description: 'Updated description of the session',
          example: 'A calming evening Pilates session.',
        },
        maxAttendane: {
          type: 'integer',
          description: 'Updated maximum number of attendees',
          example: 20,
        },
        price: {
          type: 'number',
          description: 'Updated price per attendee',
          example: 25,
        },
      },
      required: [
        'name',
        'date',
        'time',
        'description',
        'maxAttendane',
        'price',
      ],
    },
  })
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
  @ApiOperation({ summary: 'Delete a Pilates session by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the session.',
    type: PilatesEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Failed to delete Pilates session.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the Pilates session',
    example: '1',
  })
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
