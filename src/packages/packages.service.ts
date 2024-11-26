import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PackageDocument, PackageEntity } from './package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(PackageEntity.name)
    private readonly packageModel: Model<PackageDocument>,
  ) {}

  // Create a new package
  async create(createPackageDto: CreatePackageDto): Promise<PackageEntity> {
    const newPackage = new this.packageModel(createPackageDto);
    return newPackage.save();
  }

  // Retrieve all packages
  async findAll(): Promise<PackageEntity[]> {
    return this.packageModel.find().exec();
  }

  // Retrieve a single package by ID
  async findOne(id: string): Promise<PackageEntity> {
    const pack = await this.packageModel.findById(id).exec();
    if (!pack) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return pack;
  }

  // Update a package by ID
  async update(
    id: string,
    updatePackageDto: UpdatePackageDto,
  ): Promise<PackageEntity> {
    const updatedPackage = await this.packageModel
      .findByIdAndUpdate(id, updatePackageDto, { new: true })
      .exec();

    if (!updatedPackage) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }

    return updatedPackage;
  }

  // Delete a package by ID
  async remove(id: string): Promise<PackageEntity> {
    const deletedPackage = await this.packageModel.findByIdAndDelete(id).exec();
    if (!deletedPackage) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return deletedPackage;
  }
}
