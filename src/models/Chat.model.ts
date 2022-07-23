import mongoose from 'mongoose';
import { MessageDocument } from './Message.model';
import { UserDocument } from './User.model';

export interface ChatDocument extends mongoose.Document {
  users: Array<UserDocument['_id']>;
  messages?: Array<MessageDocument['_id']>;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model<ChatDocument>('Chat', ChatSchema);

export default Chat;
