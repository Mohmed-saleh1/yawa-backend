import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument, EventEntity } from './events.schema';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(EventEntity.name)
    private readonly eventModel: Model<EventDocument>,
  ) {}

  // Create a new event
  async create(createEventDto: CreateEventDto): Promise<EventEntity> {
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }

  // Retrieve all events
  async findAll(): Promise<EventEntity[]> {
    return this.eventModel.find().exec();
  }

  // Retrieve a single event by ID
  async findOne(id: string): Promise<EventEntity> {
    return this.eventModel.findById(id).exec();
  }

  // Update an event by ID
  async update(
    id: string,
    updateEventDto: Partial<CreateEventDto>,
  ): Promise<EventEntity> {
    return this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();
  }

  // Delete an event by ID
  async remove(id: string): Promise<EventEntity> {
    return this.eventModel.findByIdAndDelete(id).exec();
  }
}
