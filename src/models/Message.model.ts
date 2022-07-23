import mongoose from 'mongoose';
import { UserDocument } from './User.model';
import { ChatDocument } from './Chat.model';

export interface MessageDocument extends mongoose.Document {
  userId: UserDocument['_id'];
  chatId: ChatDocument['_id'];
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new mongoose.Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model<MessageDocument>('Message', MessageSchema);

export default Message;
