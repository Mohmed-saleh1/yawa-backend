import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { EventModule } from './events/events.module';
import { YogaClassModule } from './yoga/yoga.module';
import { PilatesModule } from './Pilates/pilates.module';
import { BalletModule } from './ballet/ballet.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    EventModule,
    YogaClassModule,
    PilatesModule,
    BalletModule,
  ],
})
export class AppModule {}
