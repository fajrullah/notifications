import { Document, Schema, model } from 'mongoose';
import { LogStatus } from '../types/index';
import { IUser } from './User';
export interface ILogModelDocument extends Document {
  message: string;
  email: string;
  status: LogStatus;
  sendDate: string;
  payload?: IUser;
}

const logSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(LogStatus),
    default: LogStatus.PENDING,
  },
  sendDate: {
    type: Date,
    required: true,
  },
  payload: {
    type: Object,
    default: {}
  }
});

const Log = model<ILogModelDocument>('Log', logSchema);

export default Log;
