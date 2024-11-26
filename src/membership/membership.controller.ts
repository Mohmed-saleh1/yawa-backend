import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { MembershipEntity } from './membership.entity';

@ApiTags('Memberships') // Group all endpoints under the "Memberships" section
@Controller('memberships')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  // Create a new membership
  @Post()
  @ApiOperation({ summary: 'Create a new membership' })
  @ApiResponse({
    status: 201,
    description: 'The membership has been successfully created.',
    type: MembershipEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(
    @Body() createMembershipDto: CreateMembershipDto,
  ): Promise<MembershipEntity> {
    return this.membershipService.create(createMembershipDto);
  }

  // Retrieve all memberships
  @Get()
  @ApiOperation({ summary: 'Retrieve all memberships' })
  @ApiResponse({
    status: 200,
    description: 'A list of memberships has been retrieved successfully.',
    type: [MembershipEntity],
  })
  async findAll(): Promise<MembershipEntity[]> {
    return this.membershipService.findAll();
  }

  // Retrieve a single membership by ID
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single membership by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the membership',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The membership has been retrieved successfully.',
    type: MembershipEntity,
  })
  @ApiResponse({ status: 404, description: 'Membership not found.' })
  async findOne(@Param('id') id: string): Promise<MembershipEntity> {
    return this.membershipService.findOne(id);
  }

  // Update a membership by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update a membership by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the membership to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The membership has been successfully updated.',
    type: MembershipEntity,
  })
  @ApiResponse({ status: 404, description: 'Membership not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ): Promise<MembershipEntity> {
    return this.membershipService.update(id, updateMembershipDto);
  }

  // Delete a membership by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a membership by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the membership to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The membership has been successfully deleted.',
    type: MembershipEntity,
  })
  @ApiResponse({ status: 404, description: 'Membership not found.' })
  async remove(@Param('id') id: string): Promise<MembershipEntity> {
    return this.membershipService.remove(id);
  }
}
