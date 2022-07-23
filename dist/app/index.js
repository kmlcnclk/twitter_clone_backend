"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var connect_1 = __importDefault(require("../db/connect"));
var customErrorHandler_1 = __importDefault(require("../errors/customErrorHandler"));
var logger_1 = __importDefault(require("../logger"));
var middlewares_1 = require("../middlewares");
var consumer_rabbitmq_1 = __importDefault(require("../rabbitmq/consumer.rabbitmq"));
var http_1 = __importDefault(require("http"));
var index_1 = __importDefault(require("../socket.io/index"));
var App = /** @class */ (function () {
    function App(router, port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.consumer = new consumer_rabbitmq_1.default();
        this.server = http_1.default.createServer(this.app);
        this.socketIO = new index_1.default(this.server);
        this.databaseConnection();
        // this.rabbitMQ();
        this.initializeMiddlewares();
        this.initializeRouter(router);
        this.initializeCustomErrorHandler();
    }
    App.prototype.databaseConnection = function () {
        (0, connect_1.default)();
        // connectRedis();
    };
    App.prototype.rabbitMQ = function () {
        this.consumer.verificationEmail('verificationEmail');
    };
    App.prototype.initializeMiddlewares = function () {
        // buradaki cors çalışıyor mu ona bak
        this.app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(middlewares_1.deserializeUser);
    };
    App.prototype.initializeRouter = function (router) {
        this.app.use(router);
    };
    App.prototype.initializeCustomErrorHandler = function () {
        this.app.use(customErrorHandler_1.default);
    };
    App.prototype.listen = function () {
        var _this = this;
        // this.app.listen(this.port || 5000, () => {
        //   log.info(`Server running at http://localhost:${this.port}`);
        // });
        this.server.listen(this.port || 5000, function () {
            logger_1.default.info("Server running at http://localhost:".concat(_this.port));
        });
    };
    return App;
}());
exports.default = App;
