"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var chat_controller_1 = __importDefault(require("../controllers/chat.controller"));
var chat_schema_1 = require("../schemas/chat.schema");
var middlewares_1 = require("../middlewares");
var chat_middleware_1 = __importDefault(require("../middlewares/chat.middleware"));
var router = express_1.default.Router();
var MessageRouter = /** @class */ (function () {
    function MessageRouter() {
        this.chatController = new chat_controller_1.default();
        this.chatMiddleware = new chat_middleware_1.default();
        this.gets();
        this.posts();
    }
    MessageRouter.prototype.gets = function () {
        router.get('/getChatsFromUser', [middlewares_1.requiresUser], this.chatController.getChatsFromUser);
    };
    MessageRouter.prototype.posts = function () {
        router.post('/createChat', [
            middlewares_1.requiresUser,
            (0, middlewares_1.validateRequest)(chat_schema_1.createChatSchema),
            this.chatMiddleware.isUserAvailable,
        ], this.chatController.createChat);
    };
    return MessageRouter;
}());
new MessageRouter();
exports.default = router;
