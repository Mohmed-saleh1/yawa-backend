// package.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PackageService } from './packages.service';
import { PackageController } from './packages.controller';
import { PackageEntity, PackageSchema } from './package.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PackageEntity.name, schema: PackageSchema },
    ]),
  ],
  providers: [PackageService],
  controllers: [PackageController],
})
export class PackageModule {}
