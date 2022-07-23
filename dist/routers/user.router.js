"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = __importDefault(require("../controllers/user.controller"));
var middlewares_1 = require("../middlewares");
var user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
var user_schema_1 = require("../schemas/user.schema");
var router = express_1.default.Router();
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.userController = new user_controller_1.default();
        this.userMiddleware = new user_middleware_1.default();
        this.gets();
        this.posts();
    }
    UserRouter.prototype.gets = function () {
        router.get('/getAllUser', this.userController.getAllUser);
    };
    UserRouter.prototype.posts = function () {
        router.post('/register', [(0, middlewares_1.validateRequest)(user_schema_1.registerUserSchema), this.userMiddleware.register], this.userController.register);
    };
    return UserRouter;
}());
new UserRouter();
exports.default = router;
