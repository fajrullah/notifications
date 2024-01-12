// src/app.ts
import express, { Application } from 'express';
import UserRoute from './routes/UserRoutes';


require('./db');

const app: Application = express();

const port = 3000;

app.use(express.json());

app.use(UserRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
