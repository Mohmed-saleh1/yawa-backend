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
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventEntity } from './events.schema';

@ApiTags('Events') // Group all endpoints under the "Events" section
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // Create a new event
  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({
    status: 201,
    description: 'The event has been successfully created.',
    type: EventEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createEventDto: CreateEventDto): Promise<EventEntity> {
    return this.eventService.create(createEventDto);
  }

  // Retrieve all events
  @Get()
  @ApiOperation({ summary: 'Retrieve all events' })
  @ApiResponse({
    status: 200,
    description: 'A list of events has been retrieved successfully.',
    type: [EventEntity],
  })
  async findAll(): Promise<EventEntity[]> {
    return this.eventService.findAll();
  }

  // Retrieve a single event by ID
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single event by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the event', type: String })
  @ApiResponse({
    status: 200,
    description: 'The event has been retrieved successfully.',
    type: EventEntity,
  })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async findOne(@Param('id') id: string): Promise<EventEntity> {
    return this.eventService.findOne(id);
  }

  // Update an event by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update an event by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the event to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The event has been successfully updated.',
    type: EventEntity,
  })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: Partial<CreateEventDto>,
  ): Promise<EventEntity> {
    return this.eventService.update(id, updateEventDto);
  }

  // Delete an event by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the event to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The event has been successfully deleted.',
    type: EventEntity,
  })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async remove(@Param('id') id: string): Promise<EventEntity> {
    return this.eventService.remove(id);
  }
}
