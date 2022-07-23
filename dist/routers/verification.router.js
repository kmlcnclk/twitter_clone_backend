"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var verification_controller_1 = __importDefault(require("../controllers/verification.controller"));
var middlewares_1 = require("../middlewares");
var verification_schema_1 = require("../schemas/verification.schema");
var router = express_1.default.Router();
var VerificationRouter = /** @class */ (function () {
    function VerificationRouter() {
        this.verificationController = new verification_controller_1.default();
        this.gets();
        this.posts();
    }
    VerificationRouter.prototype.gets = function () {
        router.get('/verificationEmail', (0, middlewares_1.validateRequest)(verification_schema_1.verificationEmailSchema), this.verificationController.verificationEmail);
    };
    VerificationRouter.prototype.posts = function () {
        router.post('/checkEmailVerificationCode', (0, middlewares_1.validateRequest)(verification_schema_1.checkEmailVerificationCodeSchema), this.verificationController.checkEmailVerificationCode);
    };
    return VerificationRouter;
}());
new VerificationRouter();
exports.default = router;
