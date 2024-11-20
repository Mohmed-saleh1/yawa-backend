import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { YogaClass, YogaClassDocument } from './yoga.entity';
import { CreateYogaClassDto } from './dto/create-yoga.dto';
import { UpdateYogaClassDto } from './dto/update-yoga.dto';

@Injectable()
export class YogaClassService {
  constructor(
    @InjectModel(YogaClass.name)
    private yogaClassModel: Model<YogaClassDocument>,
  ) {}

  async create(createYogaClassDto: CreateYogaClassDto): Promise<YogaClass> {
    const yogaClass = new this.yogaClassModel(createYogaClassDto);
    return yogaClass.save();
  }

  async findAll(): Promise<YogaClass[]> {
    return this.yogaClassModel.find().exec();
  }

  async findOne(id: string): Promise<YogaClass> {
    const yogaClass = await this.yogaClassModel.findById(id).exec();
    if (!yogaClass) {
      throw new NotFoundException(`Yoga Class with ID ${id} not found`);
    }
    return yogaClass;
  }

  async update(
    id: string,
    updateYogaClassDto: UpdateYogaClassDto,
  ): Promise<YogaClass> {
    const updatedYogaClass = await this.yogaClassModel
      .findByIdAndUpdate(id, updateYogaClassDto, { new: true })
      .exec();
    if (!updatedYogaClass) {
      throw new NotFoundException(`Yoga Class with ID ${id} not found`);
    }
    return updatedYogaClass;
  }

  async remove(id: string): Promise<void> {
    const result = await this.yogaClassModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Yoga Class with ID ${id} not found`);
    }
  }
}
