import mongoose from 'mongoose';
import {
  CommentType,
  LikeType,
  QuoteType,
  RetweetType,
  UserIDType,
} from '../types/Models.type';

export interface StatusDocument extends mongoose.Document {
  userId: UserIDType;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  likeCount?: number;
  likes?: LikeType;
  retweetCount: number;
  retweets: RetweetType;
  quoteTweetCount: number;
  quoteTweets: QuoteType;
  commentCount: number;
  comments: CommentType;
  createdAt: Date;
  updatedAt: Date;
}

const StatusSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    imageUrl: { type: String },
    videoUrl: { type: String },
    likeCount: { type: Number, default: 0 },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    retweetCount: {
      type: Number,
      default: 0,
    },
    retweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    quoteTweetCount: {
      type: Number,
      default: 0,
    },
    quoteTweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quote', // comment lerid e status içinden yap ve reweetleri e ve quote leri de yap bunaların false değerleri falan olsun etc.
      },
    ],
    commentCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Status = mongoose.model<StatusDocument>('Status', StatusSchema);

export default Status;
