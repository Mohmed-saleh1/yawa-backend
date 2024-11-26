import { Module } from '@nestjs/common';
import { AllProgramsController } from './allPrograms.controller';
import { AllProgramsService } from './allPrograms.service';
import { BalletModule } from 'src/ballet/ballet.module';
import { PilatesModule } from 'src/Pilates/pilates.module';
import { EventModule } from 'src/events/events.module';
import { MassageModule } from 'src/massage/massage.module';
import { PrivateClassModule } from 'src/private-class/private-class.module';
import { YogaClassModule } from 'src/yoga/yoga.module';

@Module({
  imports: [
    BalletModule,
    PilatesModule,
    EventModule,
    MassageModule,
    PrivateClassModule,
    YogaClassModule,
  ],
  controllers: [AllProgramsController],
  providers: [AllProgramsService],
})
export class AllProgramsModule {}
