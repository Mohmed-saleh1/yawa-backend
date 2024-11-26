import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MembershipEntity, MembershipSchema } from './membership.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MembershipEntity.name, schema: MembershipSchema },
    ]),
  ],
  controllers: [MembershipController],
  providers: [MembershipService],
})
export class MembershipModule {}
