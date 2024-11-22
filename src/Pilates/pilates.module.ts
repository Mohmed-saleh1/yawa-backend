import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PilatesEntity, PilatesSchema } from './pilates.schema';
import { PilatesService } from './pilates.service';
import { PilatesController } from './pilates.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PilatesEntity.name, schema: PilatesSchema },
    ]),
  ],
  controllers: [PilatesController],
  providers: [PilatesService],
})
export class PilatesModule {}
