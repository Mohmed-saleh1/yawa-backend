import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as Sib from 'sib-api-v3-sdk';

@Injectable()
export class EmailUtil {
  constructor(private configService: ConfigService) {}

  async sendVerifyEmail(options: {
    to: string;
    subject: string;
    user: string;
    code: string;
    message: string;
  }) {
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = this.configService.get('API_KEY');

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    try {
      await tranEmailApi.sendTransacEmail({
        sender: {
          email: this.configService.get('SENDER_EMAIL'),
          name: this.configService.get('SENDER_NAME'),
        },
        to: [{ email: options.to }],
        subject: options.subject,
        params: {
          user: options.user,
          code: options.code,
          message: options.message,
        },
        htmlContent: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification Code</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f7f9fc;
        color: #333;
      }

      .container {
        max-width: 600px;
        margin: 30px auto;
        padding: 40px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .header {
        text-align: center;
        margin-bottom: 40px;
      }

      .header img {
        max-width: 150px;
        height: auto;
      }

      .content {
        text-align: center;
      }

      .content h3 {
        font-size: 22px;
        color: #333;
        margin-bottom: 15px;
      }

      .content p {
        font-size: 16px;
        line-height: 1.6;
        color: #555;
        margin-bottom: 20px;
      }

      .verification-code {
        font-size: 28px;
        font-weight: bold;
        background-color: #e0f7fa;
        padding: 10px 20px;
        border-radius: 5px;
        color: #00796b;
        display: inline-block;
        margin-bottom: 30px;
      }

      .note {
        color: #888;
        font-size: 14px;
        margin-bottom: 20px;
      }

      .footer {
        text-align: center;
        font-size: 14px;
        color: #888;
        margin-top: 30px;
      }

      .footer p {
        margin: 5px 0;
      }

      .footer a {
        color: #00796b;
        text-decoration: none;
        font-weight: bold;
      }

      .footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStDW7t73MOxHIQVZ7tJiBJlMuyf2BRmtqGaQ&s" alt="Logo">
      </div>

      <div class="content">
        <h3>Dear {{params.user}},</h3>
        <p>Your Verification code is:</p>
        <p class="verification-code"><strong>{{params.code}}</strong></p>
        <p class="note">{{params.message}}.</p>
      </div>

      <div class="footer">
        <p>Thank you for using our service.</p>
        <p>The Yawa Team</p>
      </div>
    </div>
  </body>
</html>
`,
      });

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email', error);
    }
  }

  async sendForgotPasswordEmail(options: {
    to: string;
    subject: string;
    user: string;
    resetCode: string;
    message: string;
  }) {
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = this.configService.get('API_KEY');

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    try {
      await tranEmailApi.sendTransacEmail({
        sender: {
          email: this.configService.get('SENDER_EMAIL'),
          name: this.configService.get('SENDER_NAME'),
        },
        to: [{ email: options.to }],
        subject: options.subject,
        params: {
          user: options.user,
          resetCode: options.resetCode,
          message: options.message,
        },
        htmlContent: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset Code</title>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f7f9fc;
                color: #333;
              }
  
              .container {
                max-width: 600px;
                margin: 30px auto;
                padding: 40px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              }
  
              .header {
                text-align: center;
                margin-bottom: 40px;
              }
  
              .header img {
                max-width: 150px;
                height: auto;
              }
  
              .content {
                text-align: center;
              }
  
              .content h3 {
                font-size: 22px;
                color: #333;
                margin-bottom: 15px;
              }
  
              .content p {
                font-size: 16px;
                line-height: 1.6;
                color: #555;
                margin-bottom: 20px;
              }
  
              .reset-code {
                font-size: 28px;
                font-weight: bold;
                background-color: #e0f7fa;
                padding: 10px 20px;
                border-radius: 5px;
                color: #00796b;
                display: inline-block;
                margin-bottom: 30px;
              }
  
              .note {
                color: #888;
                font-size: 14px;
                margin-bottom: 20px;
              }
  
              .footer {
                text-align: center;
                font-size: 14px;
                color: #888;
                margin-top: 30px;
              }
  
              .footer p {
                margin: 5px 0;
              }
  
              .footer a {
                color: #00796b;
                text-decoration: none;
                font-weight: bold;
              }
  
              .footer a:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStDW7t73MOxHIQVZ7tJiBJlMuyf2BRmtqGaQ&s" alt="Logo">
              </div>
  
              <div class="content">
                <h3>Dear {{params.user}},</h3>
                <p>Your password reset code is:</p>
                <p class="reset-code"><strong>{{params.resetCode}}</strong></p>
                <p class="note">{{params.message}}.</p>
              </div>
  
              <div class="footer">
                <p>Thank you for using our service.</p>
                <p>The Yawa Team</p>
              </div>
            </div>
          </body>
        </html>
        `,
      });

      console.log('Password reset email sent successfully');
    } catch (error) {
      console.error('Error sending password reset email', error);
    }
  }

  async sendWelcomeEmail(options: {
    to: string;
    subject: string;
    user: string;
    message: string;
  }) {
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = this.configService.get('API_KEY');

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    try {
      await tranEmailApi.sendTransacEmail({
        sender: {
          email: this.configService.get('SENDER_EMAIL'),
          name: this.configService.get('SENDER_NAME'),
        },
        to: [{ email: options.to }],
        subject: options.subject,
        params: {
          user: options.user,
          message: options.message,
        },
        htmlContent: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to [Your Company Name]!</title>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f7f9fc;
                color: #333;
              }
  
              .container {
                max-width: 600px;
                margin: 30px auto;
                padding: 40px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              }
  
              .header {
                text-align: center;
                margin-bottom: 40px;
              }
  
              .header img {
                max-width: 150px;
                height: auto;
              }
  
              .content {
                text-align: center;
              }
  
              .content h3 {
                font-size: 22px;
                color: #333;
                margin-bottom: 15px;
              }
  
              .content p {
                font-size: 16px;
                line-height: 1.6;
                color: #555;
                margin-bottom: 20px;
              }
  
              .note {
                color: #888;
                font-size: 14px;
                margin-bottom: 20px;
              }
  
              .footer {
                text-align: center;
                font-size: 14px;
                color: #888;
                margin-top: 30px;
              }
  
              .footer p {
                margin: 5px 0;
              }
  
              .footer a {
                color: #00796b;
                text-decoration: none;
                font-weight: bold;
              }
  
              .footer a:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://yourcompany.com/logo.png" alt="Logo">
              </div>
  
              <div class="content">
                <h3>Hello {{params.user}},</h3>
                <p>Welcome to [Your Company Name]!</p>
                <p>{{params.message}}</p>
              </div>
  
              <div class="footer">
                <p>We’re excited to have you with us.</p>
                <p>The [Your Company Name] Team</p>
              </div>
            </div>
          </body>
        </html>
        `,
      });

      console.log('Welcome email sent successfully');
    } catch (error) {
      console.error('Error sending welcome email', error);
    }
  }
}
