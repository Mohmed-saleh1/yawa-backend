import { Injectable } from '@nestjs/common';
import { BalletService } from '../ballet/ballet.service';
import { EventService } from '../events/event.service';
import { PilatesService } from '../Pilates/pilates.service';
import { PrivateClassService } from '../private-class/private-class.service';
import { YogaClassService } from '../yoga/yoga.service';

@Injectable()
export class AllProgramsService {
  constructor(
    private readonly balletService: BalletService,
    private readonly pilatesService: PilatesService,
    private readonly eventService: EventService,
    private readonly privateClassService: PrivateClassService,
    private readonly yogaService: YogaClassService,
  ) {}

  // Aggregated method to get all data from the modules
  async getAllClasses(): Promise<any> {
    const balletClasses = await this.balletService.findAll();
    const pilatesClasses = await this.pilatesService.findAll();
    const events = await this.eventService.findAll();
    const privateClasses = await this.privateClassService.findAll();
    const yogaClasses = await this.yogaService.findAll();

    return {
      balletClasses,
      pilatesClasses,
      events,
      privateClasses,
      yogaClasses,
    };
  }
}
