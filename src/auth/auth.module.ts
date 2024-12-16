import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { User, UserSchema } from 'src/users/user.schema';
import { AuthController } from './auth.controleller';
import { EmailUtil } from 'src/common/utils/email.utils';
import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailUtil, UserService],
  exports: [EmailUtil],
})
export class AuthModule {}
