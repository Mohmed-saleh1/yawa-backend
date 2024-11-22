import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BalletEntity } from './ballet.schema';
import { CreateBalletDto } from './Dtos/create-ballet.dto';
import { UpdateBalletDto } from './Dtos/update-ballet-dto';

@Injectable()
export class BalletService {
  constructor(
    @InjectModel(BalletEntity.name)
    private readonly balletModel: Model<BalletEntity>,
  ) {}

  async create(createBalletDto: CreateBalletDto): Promise<BalletEntity> {
    const existingSession = await this.balletModel.findOne({
      date: createBalletDto.date,
      time: createBalletDto.time,
    });

    if (existingSession) {
      throw new HttpException(
        `A Ballet session already exists on ${createBalletDto.date} at ${createBalletDto.time}.`,
        HttpStatus.CONFLICT,
      );
    }

    const newBallet = new this.balletModel(createBalletDto);
    return newBallet.save();
  }

  async findAll(): Promise<BalletEntity[]> {
    return this.balletModel.find().exec();
  }

  async findOne(id: string): Promise<BalletEntity> {
    return this.balletModel.findById(id).exec();
  }

  async update(
    id: string,
    updateBalletDto: UpdateBalletDto,
  ): Promise<BalletEntity> {
    return this.balletModel
      .findByIdAndUpdate(id, updateBalletDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<BalletEntity> {
    return this.balletModel.findByIdAndDelete(id).exec();
  }
}
