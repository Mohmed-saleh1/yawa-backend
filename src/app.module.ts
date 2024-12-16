import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { EventModule } from './events/events.module';
import { YogaClassModule } from './yoga/yoga.module';
import { PilatesModule } from './Pilates/pilates.module';
import { BalletModule } from './ballet/ballet.module';
import { PrivateClassModule } from './private-class/private-class.module';
import { MassageModule } from './massage/massage.module';
import { AllProgramsModule } from './allPrograms/allPrograms.module';
import { MembershipModule } from './membership/membership.module';
import { PackageModule } from './packages/packages.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    EventModule,
    YogaClassModule,
    PilatesModule,
    BalletModule,
    PrivateClassModule,
    MassageModule,
    AllProgramsModule,
    MembershipModule,
    PackageModule,
  ],
})
export class AppModule {}
