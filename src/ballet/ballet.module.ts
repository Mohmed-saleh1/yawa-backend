import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BalletService } from './ballet.service';
import { BalletController } from './ballet.controller';
import { BalletEntity, BalletSchema } from './ballet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BalletEntity.name, schema: BalletSchema },
    ]),
  ],
  providers: [BalletService],
  controllers: [BalletController],
  exports: [BalletService],
})
export class BalletModule {}
