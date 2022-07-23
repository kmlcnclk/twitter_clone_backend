"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var dayjs_1 = __importDefault(require("dayjs"));
var tsFormat = function () { return (0, dayjs_1.default)().format('DD/MM/YYYY HH:mm:ss'); };
var customFormat = winston_1.format.combine(winston_1.format.timestamp({ format: tsFormat }), winston_1.format.colorize(), winston_1.format.printf(function (info) {
    return "[".concat(info.timestamp, "] - [").concat(info.level, "]: ").concat(info.message);
}));
var logger = (0, winston_1.createLogger)({
    level: 'info',
    format: customFormat,
    transports: [
        new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'warn.log', level: 'warn' }),
        new winston_1.transports.File({ filename: 'info.log', level: 'info' }),
        new winston_1.transports.Console({ format: customFormat }),
    ],
});
exports.default = logger;
