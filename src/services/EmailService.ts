// src/services/EmailService.ts
import axios, { AxiosError, AxiosResponse } from 'axios';
import Log from '../models/Log';
import { LogStatus } from '../types/index';
import { TimezoneConverter } from '../utils';
import DateInitializer from './DateInitializer';
interface EmailPayload {
  email: string;
  message: string;
  payload: any;
}

export class EmailService extends DateInitializer {
  public async sendEmail({ message, email, payload }: EmailPayload): Promise<void> {
    const objectDefault = {
      message, 
      email, 
      payload,
      sendDate: this._currentDate,
      status: LogStatus.SENT, 
    }

    console.log("converter", TimezoneConverter(payload.location.timezone))
    try {
      const response: AxiosResponse = await axios.post('https://email-service.digitalenvision.com.au/send-email', {
        email, message
      });

      console.log('Email service response:', response.data);

      Log.create(objectDefault);

    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error sending email:', axiosError.message);
      
      Log.insertMany([
        {
          ...objectDefault,
          status: LogStatus.FAILED, 
        },
        {
          ...objectDefault, 
          status: LogStatus.PENDING, 
          sendDate: TimezoneConverter(payload.location.timezone),
        }
      ])
    }
  }
}
