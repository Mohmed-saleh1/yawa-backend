import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventEntity, EventSchema } from './events.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventEntity.name, schema: EventSchema },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
