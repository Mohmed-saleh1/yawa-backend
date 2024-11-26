import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { YogaClassService } from './yoga.service';
import { YogaClassController } from './yoga.controller';
import { YogaClass, YogaClassSchema } from './yoga.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: YogaClass.name, schema: YogaClassSchema },
    ]),
  ],
  controllers: [YogaClassController],
  providers: [YogaClassService],
  exports: [YogaClassService],
})
export class YogaClassModule {}
