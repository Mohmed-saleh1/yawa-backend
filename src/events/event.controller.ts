import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventEntity } from './events.schema';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // Create a new event
  @Post()
  async create(@Body() createEventDto: CreateEventDto): Promise<EventEntity> {
    return this.eventService.create(createEventDto);
  }

  // Retrieve all events
  @Get()
  async findAll(): Promise<EventEntity[]> {
    return this.eventService.findAll();
  }

  // Retrieve a single event by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EventEntity> {
    return this.eventService.findOne(id);
  }

  // Update an event by ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: Partial<CreateEventDto>,
  ): Promise<EventEntity> {
    return this.eventService.update(id, updateEventDto);
  }

  // Delete an event by ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<EventEntity> {
    return this.eventService.remove(id);
  }
}
