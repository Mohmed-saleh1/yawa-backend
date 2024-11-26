import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AllProgramsService } from './allPrograms.service';

@ApiTags('Aggregated Data')
@Controller('all-programms')
export class AllProgramsController {
  constructor(private readonly allProgramsService: AllProgramsService) {}

  @Get('all-classes')
  @ApiOperation({ summary: 'Get all classes and events from all modules' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all classes and events',
  })
  async getAllClasses() {
    return this.allProgramsService.getAllClasses();
  }
}
