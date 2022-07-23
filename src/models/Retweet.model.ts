import mongoose from 'mongoose';
import { UserDocument } from './User.model';
import { StatusDocument } from './Status.model';

export interface RetweetDocument extends mongoose.Document {
  createdAt: Date;
  userId: UserDocument['_id'];
  statusId: StatusDocument['_id'];
  updatedAt: Date;
}

const RetweetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    statusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Status' },
  },
  {
    timestamps: true,
  }
);

const Retweet = mongoose.model<RetweetDocument>('Retweet', RetweetSchema);

export default Retweet;
