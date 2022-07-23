"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var CustomError_1 = __importDefault(require("../errors/CustomError"));
var user_service_1 = __importDefault(require("../services/user.service"));
var UserMiddleware = /** @class */ (function () {
    function UserMiddleware() {
        var _this = this;
        this.register = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, phone;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, phone = _a.phone;
                        if (!phone && !email)
                            throw new CustomError_1.default('Bad Request', 'Phone or Email field required', 400);
                        if (!email) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.isEmailAlreadyExist(email)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!phone) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.isPhoneAlreadyExist(phone)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        next();
                        return [2 /*return*/];
                }
            });
        }); });
        this.isEmailAlreadyExist = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var isEmailAlreadyExist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findUser({ email: email })];
                    case 1:
                        isEmailAlreadyExist = _a.sent();
                        if (isEmailAlreadyExist)
                            throw new CustomError_1.default('Bad Request', 'Email should be unique', 400);
                        return [2 /*return*/];
                }
            });
        }); };
        this.isPhoneAlreadyExist = function (phone) { return __awaiter(_this, void 0, void 0, function () {
            var isPhoneAlreadyExist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findUser({ phone: phone })];
                    case 1:
                        isPhoneAlreadyExist = _a.sent();
                        if (isPhoneAlreadyExist)
                            throw new CustomError_1.default('Bad Request', 'Phone should be unique', 400);
                        return [2 /*return*/];
                }
            });
        }); };
        this.isUsernameAlreadyExist = function (username) { return __awaiter(_this, void 0, void 0, function () {
            var isUsernameAlreadyExist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findUser({
                            username: username,
                        })];
                    case 1:
                        isUsernameAlreadyExist = _a.sent();
                        if (isUsernameAlreadyExist)
                            throw new CustomError_1.default('Bad Request', 'Username should be unique', 400);
                        return [2 /*return*/];
                }
            });
        }); };
        this.userService = new user_service_1.default();
    }
    return UserMiddleware;
}());
exports.default = UserMiddleware;
