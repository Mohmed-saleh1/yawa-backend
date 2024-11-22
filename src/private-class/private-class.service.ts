import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePrivateClassDto } from './dto/create-private-class.dto';
import { UpdatePrivateClassDto } from './dto/update-private-class.dto';
import { PrivateClassEntity } from './private-class.schema';

@Injectable()
export class PrivateClassService {
  constructor(
    @InjectModel(PrivateClassEntity.name)
    private readonly privateClassModel: Model<PrivateClassEntity>,
  ) {}

  async create(
    createPrivateClassDto: CreatePrivateClassDto,
  ): Promise<PrivateClassEntity> {
    const newPrivateClass = new this.privateClassModel(createPrivateClassDto);
    return newPrivateClass.save();
  }

  async findAll(): Promise<PrivateClassEntity[]> {
    return this.privateClassModel.find().exec();
  }

  async findOne(id: string): Promise<PrivateClassEntity> {
    return this.privateClassModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePrivateClassDto: UpdatePrivateClassDto,
  ): Promise<PrivateClassEntity> {
    return this.privateClassModel
      .findByIdAndUpdate(id, updatePrivateClassDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<PrivateClassEntity> {
    return this.privateClassModel.findByIdAndDelete(id).exec();
  }
}
