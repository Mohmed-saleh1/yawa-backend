// package.controller.ts

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
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackageEntity } from './package.entity';
import { PackageService } from './packages.service';

@ApiTags('Packages') // Group all endpoints under the "Packages" section
@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  // Create a new package
  @Post()
  @ApiOperation({ summary: 'Create a new package' })
  @ApiResponse({
    status: 201,
    description: 'The package has been successfully created.',
    type: PackageEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(
    @Body() createPackageDto: CreatePackageDto,
  ): Promise<PackageEntity> {
    return this.packageService.create(createPackageDto);
  }

  // Retrieve all packages
  @Get()
  @ApiOperation({ summary: 'Retrieve all packages' })
  @ApiResponse({
    status: 200,
    description: 'A list of packages has been retrieved successfully.',
    type: [PackageEntity],
  })
  async findAll(): Promise<PackageEntity[]> {
    return this.packageService.findAll();
  }

  // Retrieve a single package by ID
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single package by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the package', type: String })
  @ApiResponse({
    status: 200,
    description: 'The package has been retrieved successfully.',
    type: PackageEntity,
  })
  @ApiResponse({ status: 404, description: 'Package not found.' })
  async findOne(@Param('id') id: string): Promise<PackageEntity> {
    return this.packageService.findOne(id);
  }

  // Update a package by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update a package by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the package to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The package has been successfully updated.',
    type: PackageEntity,
  })
  @ApiResponse({ status: 404, description: 'Package not found.' })
  async update(
    @Param('id') id: string,
    @Body() updatePackageDto: UpdatePackageDto,
  ): Promise<PackageEntity> {
    return this.packageService.update(id, updatePackageDto);
  }

  // Delete a package by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a package by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the package to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The package has been successfully deleted.',
    type: PackageEntity,
  })
  @ApiResponse({ status: 404, description: 'Package not found.' })
  async remove(@Param('id') id: string): Promise<PackageEntity> {
    return this.packageService.remove(id);
  }
}
