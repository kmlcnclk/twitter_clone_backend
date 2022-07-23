import mongoose from 'mongoose';
import { UserIDType } from '../types/Models.type';

export interface SessionDocument extends mongoose.Document {
  user: UserIDType;
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updated: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model<SessionDocument>('Session', SessionSchema);

export default Session;
