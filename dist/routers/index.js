"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_router_1 = __importDefault(require("./user.router"));
var session_router_1 = __importDefault(require("./session.router"));
var verification_router_1 = __importDefault(require("./verification.router"));
var message_router_1 = __importDefault(require("./message.router"));
var chat_router_1 = __importDefault(require("./chat.router"));
var router = express_1.default.Router();
var MainRouter = /** @class */ (function () {
    function MainRouter() {
        router.use('/user', user_router_1.default);
        router.use('/session', session_router_1.default);
        router.use('/verification', verification_router_1.default);
        router.use('/chat', chat_router_1.default);
        router.use('/message', message_router_1.default);
    }
    return MainRouter;
}());
new MainRouter();
exports.default = router;
