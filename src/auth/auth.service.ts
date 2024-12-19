import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import {
  resetPasswordEmailBody,
  resetPasswordEmailSubject,
  verifyEmailBody,
  verifyEmailSubject,
} from 'src/common/types/send.email.type';
import { EmailUtil } from 'src/common/utils/email.utils';
import { createToken } from 'src/common/utils/token.utils';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/user.schema';
import { UserService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private emailUtil: EmailUtil,
    private readonly userService: UserService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  validateToken(token: string): any {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  extractTokenFromHeaders(headers: Record<string, string | string[]>): string {
    const authHeader = headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    if (!authHeader.toString().startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    // Extract the token part
    return authHeader.toString().split(' ')[1];
  }

  async signup(
    signupDto: CreateUserDto,
  ): Promise<{ message: string; token: string }> {
    // 1- Check if the user already exists
    const currentUser = await this.userService.findUserByEmail(signupDto.email);
    if (currentUser) {
      throw new HttpException('Sorry, this user already exists', 401);
    }

    // 2- Create user
    const user = await this.userService.createUser(signupDto);
    // 3- Generate a verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // Save the verification code and its expiry time in the user model
    user.emailVerifyCode = crypto
      .createHash('sha256')
      .update(verificationCode)
      .digest('hex');
    user.emailVerifyExpiers = (Date.now() + 10 * 60 * 1000).toString(); // 10 minutes
    await user.save();

    // 4- Send the verification code via email
    try {
      await this.emailUtil.sendVerifyEmail({
        to: user.email,
        subject: verifyEmailSubject,
        user: user.fullName,
        code: verificationCode,
        message: verifyEmailBody,
      });
    } catch (err) {
      console.error(err);
      throw new HttpException('Error sending verification code via email', 500);
    }
    const token = createToken(user.id);

    // 5- Return response
    return { message: 'Verification code sent to your email', token };
  }
  async verifyEmail(code: string): Promise<{ message: string }> {
    const hashedCode = crypto.createHash('sha256').update(code).digest('hex');

    const user = await this.userModel.findOne({ emailVerifyCode: hashedCode });
    // if (user.isEmailVerified) {
    //   throw new BadRequestException('Email is already verified.');
    // }

    if (!user) {
      throw new BadRequestException(
        'Invalid verification code or user not found.',
      );
    }

    if (new Date(user.emailVerifyExpiers).getTime() < Date.now()) {
      throw new BadRequestException('Verification code has expired.');
    }

    // Mark user as verified and clear verification data
    user.isEmailVerified = true;
    user.emailVerifyCode = null;
    user.emailVerifyExpiers = null;
    await user.save();

    return { message: 'Email successfully verified' };
  }

  async reSendEmailVerifyCode(email: string): Promise<{ message: string }> {
    // Find the user by email
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email is already verified.');
    }

    // Generate a new verification code
    const verificationCode = crypto.randomBytes(32).toString('hex');
    const hashedCode = crypto
      .createHash('sha256')
      .update(verificationCode)
      .digest('hex');
    const expirationTime = new Date(Date.now() + 15 * 60 * 1000).toString();

    // Update the user's verification code and expiration time
    user.emailVerifyCode = hashedCode;
    user.emailVerifyExpiers = expirationTime;
    await user.save();

    // Send the new verification code via email
    try {
      await this.emailUtil.sendVerifyEmail({
        to: user.email,
        subject: verifyEmailSubject,
        user: user.fullName,
        code: verificationCode,
        message: verifyEmailBody,
      });
    } catch (err) {
      console.error(err);
      throw new HttpException(err, 500);
    }

    return { message: 'Verification code resent successfully.' };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ message: string; token: string; user: Partial<User> }> {
    // Find the user by email
    const user = await this.userService.findUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if the user's email is verified
    if (!user.isEmailVerified) {
      throw new UnauthorizedException(
        'Please verify your email before logging in',
      );
    }

    // Generate a JWT token
    const token = createToken(user.id);
    const transformUserResponse = this.userService.transformUserResponse(user);

    return { message: 'Login successful', token, user: transformUserResponse };
  }

  async forgotPassword(email: string): Promise<void> {
    // 1) Get user by email
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new HttpException(
        `There is no user with this email address ${email}`,
        HttpStatus.NOT_FOUND,
      );
    }

    // 2) Generate a random 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');

    // Save the hashed password reset code and set expiration time (10 minutes)
    user.passwordResetCode = hashedResetCode;
    const passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.passwordResetExpires = new Date(passwordResetExpires);
    user.passwordResetVerified = false;

    await user.save();

    // 3) Send the reset code via email
    try {
      await this.emailUtil.sendForgotPasswordEmail({
        to: user.email,
        subject: resetPasswordEmailSubject,
        user: user.fullName,
        resetCode: resetCode,
        message: resetPasswordEmailBody,
      });
    } catch (err) {
      // Rollback in case of error while sending email
      user.passwordResetCode = undefined;
      user.passwordResetExpires = undefined;
      user.passwordResetVerified = undefined;

      await user.save();
      throw new HttpException(
        'Error sending reset code email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyPasswordResetCode(
    code: string,
  ): Promise<{ message: string; token: string }> {
    // Hash the code received to compare it with the stored hashed reset code
    const hashedResetCode = crypto
      .createHash('sha256')
      .update(code)
      .digest('hex');

    // Find the user by hashed reset code and ensure the reset code has not expired
    const user = await this.userModel.findOne({
      passwordResetCode: hashedResetCode,
      passwordResetExpires: { $gt: Date.now() },
    });

    // Ensure the code is still valid (check expiration)
    if (!user) {
      throw new HttpException(
        'Invalid reset code or reset code has expired',
        HttpStatus.FORBIDDEN,
      );
    }

    // Mark the password reset as verified
    user.passwordResetVerified = true;
    await user.save();

    // Generate the token
    const token = createToken(user.id);
    return { message: 'Password reset code verified successfully', token };
  }

  async resetedPassword(token: string, password: string) {
    const userId = this.validateToken(token);
    const user = await this.userModel.findOne({
      _id: userId.userId,
    });
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    if (!user.passwordResetVerified) {
      throw new HttpException(
        'Password reset code has not been verified',
        HttpStatus.FORBIDDEN,
      );
    }

    user.password = password;
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
    await user.save();

    const newToken = createToken(user.id);

    return { message: 'Password reset successful', token: newToken };
  }
}
