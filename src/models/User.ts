// src/models/User.ts
import { Document, Schema, model } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  birthday: Date;
  location: {
    city: string;
    country: string;
    timezone: string;
  };
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
  },
});

const User = model<IUser>('User', userSchema);

export default User;
