import Sib from 'sib-api-v3-sdk';
require('dotenv').config();

const sendVerificationEmail = async (options) => {
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = process.env.API_KEY;
  const tranEmailApi = new Sib.TransactionalEmailsApi();

  try {
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.SENDER_EMAIL,
        name: process.env.SENDER_NAME,
      },
      to: [{ email: options.email }],
      subject: 'Email Verification Code',
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
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
      
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
      
              .logo {
                  text-align: center;
                  margin-bottom: 20px;
              }
      
              .logo img {
                  max-width: 150px;
                  height: auto;
              }
      
              .content {
                  text-align: center;
              }
      
              .verification-code {
                  font-size: 24px;
                  margin-bottom: 20px;
              }
      
              .note {
                  color: #888;
                  margin-bottom: 20px;
              }
          </style>
      </head>
      
      <body>
          <div class="container">
              <div class="logo">
                  <img src="https://s3-eu-west-1.amazonaws.com/moyasar.api.assets.prod/entities/logos/35f/d3a/77-/original/data?1714399627" alt="Logo">
              </div>
              <div class="content">
                  <h3>Dear {{params.user}},</h3>
                  <p>We received a request to verify your email address. Please use the following code to complete your verification:</p>
                  <p class="verification-code"><strong>{{params.code}}</strong></p>
                  <p class="note">{{params.message}}.</p>
                  <p>Thank you.</p>
                  <p>The Sayees Team.</p>
              </div>
          </div>
      </body>
      </html>
                `,
    });

    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

module.exports = sendVerificationEmail;
