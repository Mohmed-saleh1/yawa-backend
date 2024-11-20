import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { EventModule } from './events/events.module';
import { YogaClassModule } from './yoga/yoga.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    EventModule,
    YogaClassModule,
  ],
})
export class AppModule {}
