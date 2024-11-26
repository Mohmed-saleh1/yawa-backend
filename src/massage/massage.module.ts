import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MassageController } from './massage.controller';
import { MassageService } from './massage.service';
import { MassageEntity, MassageSchema } from './massage.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MassageEntity.name, schema: MassageSchema },
    ]),
  ],
  controllers: [MassageController],
  providers: [MassageService],
  exports: [MassageService],
})
export class MassageModule {}
