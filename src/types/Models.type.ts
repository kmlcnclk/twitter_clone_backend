import { UserDocument } from '../models/User.model';
import { QuoteDocument } from '../models/Quote.model';
import { StatusDocument } from '../models/Status.model';

export type UserIDType = UserDocument['_id'];

export type QuoteIDType = QuoteDocument['_id'];

export type CommentIDType = QuoteDocument['_id'];

export type LikeType = UserIDType[] | Array<any>;

export type RetweetType = UserIDType[] | Array<any>;

export type QuoteType = QuoteIDType[] | Array<any>;

export type CommentType = CommentIDType[] | Array<any>;

export type StatusIDType = StatusDocument['_id'];

export type StatusType = StatusIDType[] | Array<any>;
