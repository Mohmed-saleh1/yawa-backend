import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PilatesEntity } from './pilates.schema';
import { Model } from 'mongoose';
import { CreatePilatesDto } from './Dtos/create-pilates.dto';
import { UpdatePilatesDto } from './Dtos/update-pilates.dto';

@Injectable()
export class PilatesService {
  constructor(
    @InjectModel(PilatesEntity.name)
    private readonly pilatesModel: Model<PilatesEntity>,
  ) {}

  async create(createPilatesDto: CreatePilatesDto): Promise<PilatesEntity> {
    const exitsPilates = await this.pilatesModel.find({
      date: createPilatesDto.date,
      time: createPilatesDto.time,
    });

    if (exitsPilates.length > 0) {
      throw new HttpException(
        `A Pilates session already exists on ${createPilatesDto.date} at ${createPilatesDto.time}.`,
        HttpStatus.CONFLICT,
      );
    }
    const newPilates = new this.pilatesModel(createPilatesDto);
    return newPilates.save();
  }

  async findAll(): Promise<PilatesEntity[]> {
    return this.pilatesModel.find().exec();
  }

  async findOne(id: string): Promise<PilatesEntity> {
    return this.pilatesModel.findById(id).exec();
  }
  async update(
    id: string,
    updatePilatesDto: UpdatePilatesDto,
  ): Promise<PilatesEntity> {
    return this.pilatesModel
      .findByIdAndUpdate(id, updatePilatesDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<PilatesEntity> {
    return this.pilatesModel.findByIdAndDelete(id).exec();
  }
}
