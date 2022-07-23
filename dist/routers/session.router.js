"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var session_controller_1 = __importDefault(require("../controllers/session.controller"));
var middlewares_1 = require("../middlewares");
var session_schema_1 = require("../schemas/session.schema");
var router = express_1.default.Router();
var SessionRouter = /** @class */ (function () {
    function SessionRouter() {
        this.userController = new session_controller_1.default();
        this.gets();
        this.posts();
        this.deletes();
        this.patches();
    }
    SessionRouter.prototype.gets = function () {
        router.get('/getUserSessions', middlewares_1.requiresUser, this.userController.getUserSessions);
    };
    SessionRouter.prototype.posts = function () {
        router.post('/createUserSession', (0, middlewares_1.validateRequest)(session_schema_1.createSessionSchema), this.userController.createUserSession);
    };
    SessionRouter.prototype.deletes = function () {
        router.delete('/deleteUserSessions', middlewares_1.requiresUser, this.userController.deleteUserSessions);
    };
    SessionRouter.prototype.patches = function () {
        router.patch('/invalidateUserSession', middlewares_1.requiresUser, this.userController.invalidateUserSession);
    };
    return SessionRouter;
}());
new SessionRouter();
exports.default = router;
