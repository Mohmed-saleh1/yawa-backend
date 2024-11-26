import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MembershipEntity, MembershipDocument } from './membership.entity';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Injectable()
export class MembershipService {
  constructor(
    @InjectModel(MembershipEntity.name)
    private readonly membershipModel: Model<MembershipDocument>,
  ) {}

  // Create a new membership
  async create(
    createMembershipDto: CreateMembershipDto,
  ): Promise<MembershipEntity> {
    const newMembership = new this.membershipModel(createMembershipDto);
    return newMembership.save();
  }

  // Retrieve all memberships
  async findAll(): Promise<MembershipEntity[]> {
    return this.membershipModel.find().exec();
  }

  // Retrieve a single membership by ID
  async findOne(id: string): Promise<MembershipEntity> {
    const membership = await this.membershipModel.findById(id).exec();
    if (!membership) {
      throw new NotFoundException(`Membership with ID ${id} not found`);
    }
    return membership;
  }

  // Update a membership by ID
  async update(
    id: string,
    updateMembershipDto: UpdateMembershipDto,
  ): Promise<MembershipEntity> {
    const updatedMembership = await this.membershipModel
      .findByIdAndUpdate(id, updateMembershipDto, { new: true })
      .exec();

    if (!updatedMembership) {
      throw new NotFoundException(`Membership with ID ${id} not found`);
    }

    return updatedMembership;
  }

  // Delete a membership by ID
  async remove(id: string): Promise<MembershipEntity> {
    const deletedMembership = await this.membershipModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedMembership) {
      throw new NotFoundException(`Membership with ID ${id} not found`);
    }
    return deletedMembership;
  }
}
