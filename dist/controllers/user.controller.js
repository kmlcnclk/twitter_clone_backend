"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var user_service_1 = __importDefault(require("../services/user.service"));
var session_service_1 = __importDefault(require("../services/session.service"));
var lodash_1 = require("lodash");
var slugify_1 = __importDefault(require("slugify"));
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.getAllUser = (0, express_async_handler_1.default)(function (req, res) {
            res.send('aslanım');
        });
        this.register = (0, express_async_handler_1.default)(
        //@ts-ignore
        function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var name, username, data, user, session, accessToken, refreshToken;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        name = (_a = req.body) === null || _a === void 0 ? void 0 : _a.name;
                        username = (0, slugify_1.default)(name, {
                            replacement: '',
                            remove: /[*+~.()'"!:@]/g,
                            lower: true,
                        });
                        data = __assign(__assign({}, req.body), { username: username + Math.round(Math.random() * 10000000000) });
                        return [4 /*yield*/, this.userService.register(data)];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, this.sessionService.createSession(user._id, req.get('user-agent') || '')];
                    case 2:
                        session = _b.sent();
                        return [4 /*yield*/, this.sessionService.createAccessToken({
                                user: (0, lodash_1.get)(user, '_doc'),
                                session: session,
                            })];
                    case 3:
                        accessToken = _b.sent();
                        return [4 /*yield*/, this.sessionService.createRefreshToken({
                                session: session,
                            })];
                    case 4:
                        refreshToken = _b.sent();
                        return [4 /*yield*/, this.sessionService.setHeader(res, accessToken, refreshToken)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, res.status(201).json({
                                success: true,
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            })];
                }
            });
        }); });
        this.userService = new user_service_1.default();
        this.sessionService = new session_service_1.default();
    }
    return UserController;
}());
exports.default = UserController;
