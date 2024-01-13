import moment from 'moment';

import User from '../models/User';

import OneTimeScheduleService from './SendingNotificationService';

export default class ScheduledTaskService {
    
    public async runDailyTask(): Promise<void> {
      console.log('Executing daily task...');

    const tomorrow = moment().add(1, 'day');
      // Add your logic for the daily task here
      const users = await User.find({
        $expr: {
            $eq: [
              {
                $dateToString: {
                  format: '%m-%d',
                  date: '$birthday'
                }
              },
              tomorrow.format('MM-DD')
            ]
          }
      });

      const oneTimeTaskService = new OneTimeScheduleService();

      users.forEach(key => {
        oneTimeTaskService.runOneTimeTask();
      })
    }

  }