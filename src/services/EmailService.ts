// src/services/EmailService.ts
import axios, { AxiosError, AxiosResponse } from 'axios';

interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export class EmailService {
  public async sendEmail(): Promise<void> {
    try {
      // Make a POST request to the email service API
      const response: AxiosResponse = await axios.post('https://email-service.digitalenvision.com.au/send-email', {
        "email": "test@digitalenvision.com.au",
        "message": "Hi, nice to meet you."
      });

      // Handle the response as needed
      console.log('Email service response:', response.data);
    } catch (error) {
      // Handle errors
      const axiosError = error as AxiosError;
      console.error('Error sending email:', axiosError.message);
    }
  }
}
