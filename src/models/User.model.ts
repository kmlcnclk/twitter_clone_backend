import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { toNumber } from 'lodash';
import { StatusType } from '../types/Models.type';
import { ChatDocument } from './Chat.model';

interface BirthDateType {
  month: string;
  day: number;
  year: number;
}

export interface UserDocument extends mongoose.Document {
  name: string;
  username: string;
  profileText?: string;
  followers?: number;
  following?: number;
  email?: string;
  password: string;
  birthDate?: BirthDateType;
  status?: StatusType;
  location: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  chats: Array<ChatDocument['_id']>;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    profileText: { type: String },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    email: { type: String, default: '' },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    password: { type: String, required: true },
    birthDate: {
      day: Number,
      month: String,
      year: Number,
    },
    location: { type: String },
    phone: {
      type: String,
      default: '',
    },
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
      },
    ],
    status: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  let user = this as UserDocument;

  if (!user.isModified('password')) return next();

  const saltWorkFactor = toNumber(process.env.SALT_WORK_FACTOR) as number;

  const salt = await bcrypt.genSalt(saltWorkFactor);
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
