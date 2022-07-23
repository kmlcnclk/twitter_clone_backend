"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CustomError_1 = __importDefault(require("./CustomError"));
var logger_1 = __importDefault(require("../logger"));
// Custom error handler
var customErrorHandler = function (err, req, res, next) {
    var customError = err;
    if (err.name === 'SyntaxError') {
        customError = new CustomError_1.default(err.name, 'Unexpected Syntax', 400);
    }
    if (err.name === 'ValidationError') {
        customError = new CustomError_1.default(err.name, err.message, 400);
    }
    if (err.name === 'CastError') {
        customError = new CustomError_1.default(err.name, 'Please provide a valid id', 400);
    }
    // if (err.code === 11000) {
    //   customError = new CustomError(
    //     err.name,
    //     'Duplicate Key Found : Check Your Input',
    //     400
    //   );
    // }
    // if (err.name === 'TypeError') {
    //   customError = new CustomError(
    //     err.name,
    //     'Type Error : Please Check Your Input',
    //     400
    //   );
    // }
    logger_1.default.error("Name: ".concat(customError.name, ", Status Code: ").concat(customError.status || 500, ", Message: ").concat(customError.message));
    return res.status(customError.status || 500).json({
        success: false,
        error: { message: customError.message, status: customError.status || 500 },
    });
};
exports.default = customErrorHandler;
