// src/app.ts
import express, { Application } from 'express';

import UserRoute from './routes/UserRoutes';

import * as schedule from 'node-schedule';

import ScheduledTaskService from './services/ScheduleService';

import { COLLECT_DATA_TIME } from './config';


require('./db');

const app: Application = express();

const port = 3000;

app.use(express.json());

app.use(UserRoute);

// Schedule a task to run every day particular time
schedule.scheduleJob(COLLECT_DATA_TIME, () => {
  console.log(`${COLLECT_DATA_TIME} Running scheduled task every day in WIB (Indonesia)`);

  const scheduledTaskService = new ScheduledTaskService();

  scheduledTaskService.runDailyTask();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
