"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var logger_1 = __importDefault(require("../logger"));
function connect() {
    //@ts-ignore
    var DB_URI = process.env.DB_URI;
    return mongoose_1.default
        .connect(DB_URI, {
        //@ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(function () { return logger_1.default.info('Successfully connected to Mongo DB'); })
        .catch(function (error) {
        logger_1.default.error('DB Error: ', error);
        process.exit(1);
    });
}
exports.default = connect;
