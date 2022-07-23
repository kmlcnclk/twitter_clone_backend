"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var StatusSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    imageUrl: { type: String },
    videoUrl: { type: String },
    likeCount: { type: Number, default: 0 },
    likes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    retweetCount: {
        type: Number,
        default: 0,
    },
    retweets: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    quoteTweetCount: {
        type: Number,
        default: 0,
    },
    quoteTweets: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Quote', // comment lerid e status içinden yap ve reweetleri e ve quote leri de yap bunaların false değerleri falan olsun etc.
        },
    ],
    commentCount: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
}, {
    timestamps: true,
});
var Status = mongoose_1.default.model('Status', StatusSchema);
exports.default = Status;
