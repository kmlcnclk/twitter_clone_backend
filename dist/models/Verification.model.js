"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var VerificationSchema = new mongoose_1.default.Schema({
    email: String,
    phone: String,
    code: Number,
    codeExpire: Number,
}, {
    timestamps: true,
});
var Verification = mongoose_1.default.model('Verification', VerificationSchema);
exports.default = Verification;
