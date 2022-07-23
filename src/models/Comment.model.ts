import mongoose from 'mongoose';
import {
  UserIDType,
  LikeType,
  RetweetType,
  QuoteType,
  CommentType,
} from '../types/Models.type';

export interface CommentDocument extends mongoose.Document {
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

const CommentSchema = new mongoose.Schema(
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
        ref: 'Quote',
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

const Comment = mongoose.model<CommentDocument>('Comment', CommentSchema);

export default Comment;
