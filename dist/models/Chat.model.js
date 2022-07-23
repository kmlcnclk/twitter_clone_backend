"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ChatSchema = new mongoose_1.default.Schema({
    users: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Message' }],
}, {
    timestamps: true,
});
var Chat = mongoose_1.default.model('Chat', ChatSchema);
exports.default = Chat;
