"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var routers_1 = __importDefault(require("./routers"));
var dotenv_1 = __importDefault(require("dotenv"));
var lodash_1 = require("lodash");
var index_1 = __importDefault(require("./app/index"));
dotenv_1.default.config({});
var PORT = (0, lodash_1.toNumber)(process.env.PORT);
var app = new index_1.default(routers_1.default, PORT);
app.listen();
