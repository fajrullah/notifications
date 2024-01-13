import * as schedule from 'node-schedule';
import Log from '../models/Log';
import User from '../models/User';
import { LogStatus } from '../types/index';
import { TimezoneConverter } from '../utils';
import DateInitializer from './DateInitializer';
import OneTimeScheduleService from './SendingNotificationService';

interface UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  location: {
    city: string;
    country: string;
    timezone: string;
  };
}
export default class ScheduledTaskService extends DateInitializer {
  
  private birthdayExpr: object;

  constructor() {
    super()
    this.birthdayExpr = {
      $expr: {
        $eq: [
          {
            $dateToString: {
              format: '%m-%d',
              date: '$birthday'
            }
          },
          this._tomorrow.format('MM-DD')
        ]
      }
    };
  }

  private transformDtoUser(logs: any[]): UserDTO[] {
    const transform = logs.map((key) => {
      const payload = key?.payload
      return {
        location: payload?.location,
        _id: payload?._id,
        firstName: payload?.firstName,
        lastName: payload?.firstName,
        email: payload?.email,
        birthday: payload?.birthday,
      }
    })
    return transform
  } 

  private async retryingForTomorrow(): Promise<void> {
    const logs = await Log.find({
      status: LogStatus.PENDING,
      $expr: {
        $eq: [
          {
            $dateToString: {
              format: '%m-%d',
              date: '$sendDate'
            }
          },
          this._tomorrow.format('MM-DD')
        ]

      }
    },'payload');

    console.log("Set scheduler for failed message", logs.length)

    console.log('logs', logs)
    const users = this.transformDtoUser(logs);

    this.runningBulkNotifications(users, 'retrying');
  }
  
  public async runDailyTask(): Promise<void> {
    this.retryingForTomorrow()
    const users = await User.find({
      ...this.birthdayExpr
    });

    this.runningBulkNotifications(users, 'normal')
  }

  private async runningBulkNotifications (users: UserDTO[], event?: string): Promise<void> {
    const oneTimeTaskService = new OneTimeScheduleService();
    users.forEach(key => {
      const getTimezone = key.location?.timezone
      if(getTimezone){
        const scheduleServerTime = TimezoneConverter(getTimezone);
        schedule.scheduleJob(scheduleServerTime, () => {
          oneTimeTaskService.runOneTimeTask(key, event);
        });
      }
    })
  }
}