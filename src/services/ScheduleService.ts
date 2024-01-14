import * as schedule from 'node-schedule';
import Log from '../models/Log';
import User, { IUser } from '../models/User';
import { LogStatus } from '../types/index';
import { TimezoneConverter, handlerMessage } from '../utils';
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
interface LogDTO {
  message: string;
  email: string;
  status: LogStatus;
  sendDate: string;
  payload?: UserDTO;
}

interface UserIds {
  _id: string;
}
export default class ScheduledTaskService extends DateInitializer {
  
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

  private transformToUserIds(logs: any[]): UserIds[] {
    const transform = logs.map((key) => {
      const _id = key?._id
      return {
        _id
      }
    })
    return transform
  } 

  private transformToEmails(array: any[]): string[] {
    const transform = array.map((key) => {
      const email = key?.email
      return email
    })
    return transform
  } 

  private transformUserToLog(user: IUser): LogDTO{
    return {
      message: handlerMessage(user),
      email: user.email,
      status: LogStatus.UNSENT,
      sendDate: this._tomorrow.format('YYYY-MM-DD'),
      payload: user
    }
  }

  private transformUsersToLogs(users: any[]): LogDTO[] {
    const transform = users.map((key) => {
      return this.transformUserToLog(key)
    })
    return transform
  }
  
  private async prepareDataToSend(users: any[]): Promise<void> {
    await Log.insertMany(users)

    await this.retryingFailedOrUnsentMessage();
  }

  private async retryingFailedOrUnsentMessage(): Promise<void> {
    const logs = await Log.find({
      status: { $in: [LogStatus.PENDING, LogStatus.UNSENT] },
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
    },'_id status payload');

    const users = this.transformDtoUser(logs);

    const userIds = this.transformToUserIds(logs);

    await this.markLogsAsSending(userIds);

    await this.runningBulkNotifications(users, 'retrying');

  }

  private async markLogsAsSending(users: UserIds[]): Promise<void> {
    await Log.updateMany({ _id: { $in: users } },
    { $set: { status: LogStatus.RETRY } }, ).then(response => console.log("Bulk operations", JSON.stringify(users)))
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

  private async isUserBirthdayExist (): Promise<boolean> {
    const user = await User.findOne({
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
    });
    return user !== null;
  } 
  
  public async runDailyTask(): Promise<void> {

    const isLogExist = await Log.findOne({
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
    })

    const logs = await Log.find({
      status: { 
        $in: [
          LogStatus.PENDING, 
          LogStatus.UNSENT
        ] 
      },
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
    })


    const emails = this.transformToEmails(logs);

    const hasUser = await this.isUserBirthdayExist();

    if(hasUser){

      if(!isLogExist){
        const users = await User.find({
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
        });
        
        const transformToLogs = this.transformUsersToLogs(users);
        await this.prepareDataToSend(transformToLogs);
      }

      if(logs.length > 0){
        const users = await User.find({
          email: { $in: emails },
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
       });
       
       const transformToLogs = this.transformUsersToLogs(users);
       await this.prepareDataToSend(transformToLogs);
     }
      
    }

    
  }
}