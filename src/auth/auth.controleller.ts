import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto/login.dto';
import { Request, Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully and verification code sent.',
    schema: {
      example: {
        message: 'Verification code sent to your email',
        token: 'your-jwt-token',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'User already exists.',
  })
  async signup(
    @Body() signupDto: CreateUserDto,
  ): Promise<{ message: string; token: string }> {
    return this.authService.signup(signupDto);
  }

  @Post('verify-email')
  @ApiOperation({ summary: 'Verify email address with verification code' })
  @ApiResponse({
    status: 200,
    description: 'Email successfully verified',
    schema: {
      example: {
        message: 'Email successfully verified',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid verification code or user not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Email is already verified.',
  })
  @ApiResponse({
    status: 400,
    description: 'Verification code has expired.',
  })
  async verifyEmail(@Body('code') code: string): Promise<{ message: string }> {
    return this.authService.verifyEmail(code);
  }

  @Post('resend-email-verify')
  @ApiOperation({ summary: 'Resend email verification code' })
  @ApiResponse({
    status: 200,
    description: 'Verification code resent successfully.',
    schema: {
      example: {
        message: 'Verification code resent successfully.',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'User not found or email is already verified.',
  })
  async reSendEmailVerifyCode(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    return this.authService.reSendEmailVerifyCode(email);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        message: 'Login successful',
        token: 'your-jwt-token',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid email or password.',
  })
  @ApiResponse({
    status: 401,
    description: 'Please verify your email before logging in.',
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: "Send a password reset code to the user's email" })
  @ApiResponse({
    status: 200,
    description: "Password reset code sent to the user's email.",
    schema: {
      example: {
        message: 'Password reset code sent.',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found with the provided email.',
  })
  async forgotPassword(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    this.authService.forgotPassword(email);
    return { message: 'Forgot Password code sent successfully' };
  }

  @Post('verify-password-reset-code')
  @ApiOperation({ summary: 'Verify the password reset code' })
  @ApiResponse({
    status: 200,
    description: 'Password reset code verified successfully.',
    schema: {
      example: {
        message: 'Password reset code verified successfully.',
        token: 'your-jwt-token', // Example token
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Invalid or expired reset code.',
  })
  async verifyPasswordResetCode(
    @Body('code') code: string,
    @Res() res: Response,
  ): Promise<void> {
    // Verify the code using the service
    const response = await this.authService.verifyPasswordResetCode(code);

    // Set the Authorization header with the token
    res.setHeader('Authorization', `Bearer ${response.token}`);

    // Send the message back in the response
    res.status(200).json({
      message: response.message,
      token: response.token,
    });
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset the password using a valid token' })
  @ApiResponse({
    status: 200,
    description: 'Password reset successful.',
    schema: {
      example: {
        message: 'Password reset successful',
        token: 'your-jwt-token',
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Invalid token or reset code has not been verified.',
  })
  async resetPassword(
    @Body('password') password: string,
    @Req() req: Request,
  ): Promise<{ message: string; token: string }> {
    const token = await this.authService.extractTokenFromHeaders(req.headers);
    return this.authService.resetedPassword(token, password);
  }
}
