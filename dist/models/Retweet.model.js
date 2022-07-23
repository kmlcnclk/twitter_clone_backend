"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var RetweetSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    statusId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Status' },
}, {
    timestamps: true,
});
var Retweet = mongoose_1.default.model('Retweet', RetweetSchema);
exports.default = Retweet;
