// src/db.ts
import mongoose from "mongoose";

const MONGO_URI = 'mongodb://localhost:27017/notifications';

mongoose.connect(MONGO_URI)

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default mongoose;
