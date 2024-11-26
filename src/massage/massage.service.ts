import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MassageDocument, MassageEntity } from './massage.entity';
import { CreateMassageDto } from './dto/create-massage.dto';
import { UpdateMassageDto } from './dto/update-massage.dto';

@Injectable()
export class MassageService {
  constructor(
    @InjectModel(MassageEntity.name)
    private readonly massageModel: Model<MassageDocument>,
  ) {}

  // Create a new massage
  async create(createMassageDto: CreateMassageDto): Promise<MassageEntity> {
    const newMassage = new this.massageModel(createMassageDto);
    return newMassage.save();
  }

  // Retrieve all massages
  async findAll(): Promise<MassageEntity[]> {
    return this.massageModel.find().exec();
  }

  // Retrieve a single massage by ID
  async findOne(id: string): Promise<MassageEntity> {
    const massage = await this.massageModel.findById(id).exec();
    if (!massage) {
      throw new NotFoundException(`Massage with ID ${id} not found`);
    }
    return massage;
  }

  // Update a massage by ID
  async update(
    id: string,
    updateMassageDto: UpdateMassageDto,
  ): Promise<MassageEntity> {
    const updatedMassage = await this.massageModel
      .findByIdAndUpdate(id, updateMassageDto, { new: true })
      .exec();

    if (!updatedMassage) {
      throw new NotFoundException(`Massage with ID ${id} not found`);
    }

    return updatedMassage;
  }

  // Delete a massage by ID
  async remove(id: string): Promise<MassageEntity> {
    const deletedMassage = await this.massageModel.findByIdAndDelete(id).exec();
    if (!deletedMassage) {
      throw new NotFoundException(`Massage with ID ${id} not found`);
    }
    return deletedMassage;
  }
}
