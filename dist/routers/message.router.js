"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var message_controller_1 = __importDefault(require("../controllers/message.controller"));
var message_schema_1 = require("../schemas/message.schema");
var middlewares_1 = require("../middlewares");
var message_middleware_1 = __importDefault(require("../middlewares/message.middleware"));
var router = express_1.default.Router();
var MessageRouter = /** @class */ (function () {
    function MessageRouter() {
        this.messageController = new message_controller_1.default();
        this.messageMiddleware = new message_middleware_1.default();
        this.posts();
    }
    MessageRouter.prototype.posts = function () {
        router.post('/createMessage', [
            middlewares_1.requiresUser,
            (0, middlewares_1.validateRequest)(message_schema_1.createMessageSchema),
            this.messageMiddleware.isChatAvailable,
        ], this.messageController.createMessage);
    };
    return MessageRouter;
}());
new MessageRouter();
exports.default = router;
