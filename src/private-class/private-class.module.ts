import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrivateClassService } from './private-class.service';
import { PrivateClassController } from './private-class.controller';
import { PrivateClassEntity, PrivateClassSchema } from './private-class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PrivateClassEntity.name, schema: PrivateClassSchema },
    ]),
  ],
  controllers: [PrivateClassController],
  providers: [PrivateClassService],
  exports: [PrivateClassService],
})
export class PrivateClassModule {}
