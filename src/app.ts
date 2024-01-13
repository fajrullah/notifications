// src/app.ts
import express, { Application } from 'express';

import UserRoute from './routes/UserRoutes';

import * as schedule from 'node-schedule';

import ScheduledTaskService from './services/ScheduleService';

import OneTimeScheduleService from './services/SendingNotificationService';

require('./db');

const app: Application = express();

const port = 3000;

app.use(express.json());

app.use(UserRoute);

// Schedule a task to run every day particular time
// schedule.scheduleJob('50 16 * * *', () => {
//   console.log('Running scheduled task at 7:00 AM every day in WIB (Indonesia)');

//   const scheduledTaskService = new ScheduledTaskService();

//   scheduledTaskService.runDailyTask();
// });

const scheduledTaskService = new ScheduledTaskService();

scheduledTaskService.runDailyTask();

const scheduledDates = [
  new Date('2024-01-13T16:22:00'), 
  new Date('2024-01-13T16:23:00'), 
  new Date('2024-01-13T16:24:40'), 
  new Date('2024-01-13T16:25:00'), 
  new Date('2024-01-13T16:26:00'), 
];

// Iterate through the array and schedule tasks
scheduledDates.forEach((runDateTime, index) => {
  // Schedule a task for each date and time
  schedule.scheduleJob(runDateTime, () => {
    console.log(`Running scheduled task at ${runDateTime.toISOString()} (Index: ${index})`);

    // Instantiate the service class and run the one-time task
    const oneTimeTaskService = new OneTimeScheduleService();
    oneTimeTaskService.runOneTimeTask();
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
