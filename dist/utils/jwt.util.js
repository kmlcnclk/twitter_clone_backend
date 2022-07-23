"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.sign = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var sign = function (object, options) {
    var privateKey = process.env.PRIVATE_KEY;
    return jsonwebtoken_1.default.sign(object, privateKey, options);
};
exports.sign = sign;
var decode = function (token) {
    try {
        var privateKey = process.env.PRIVATE_KEY;
        var decoded = jsonwebtoken_1.default.verify(token, privateKey);
        return { valid: true, expired: false, decoded: decoded };
    }
    catch (err) {
        return {
            valid: false,
            expired: err.message === 'jwt expired',
            decoded: null,
        };
    }
};
exports.decode = decode;
