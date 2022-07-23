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
var Session_model_1 = __importDefault(require("../models/Session.model"));
var jwt_util_1 = require("../utils/jwt.util");
var lodash_1 = require("lodash");
var user_service_1 = __importDefault(require("./user.service"));
var cookie_1 = __importDefault(require("cookie"));
var lodash_2 = require("lodash");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var SessionService = /** @class */ (function () {
    function SessionService() {
        var _this = this;
        this.createSession = function (userId, userAgent) { return __awaiter(_this, void 0, void 0, function () {
            var session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Session_model_1.default.create({ user: userId, userAgent: userAgent })];
                    case 1:
                        session = _a.sent();
                        return [2 /*return*/, session.toJSON()];
                }
            });
        }); };
        this.createAccessToken = function (_a) {
            var user = _a.user, session = _a.session;
            return __awaiter(_this, void 0, void 0, function () {
                var accessTokenTtl, accessToken;
                return __generator(this, function (_b) {
                    accessTokenTtl = process.env.ACCESS_TOKEN_TTL;
                    accessToken = (0, jwt_util_1.sign)(__assign(__assign({}, user), { session: session._id }), { expiresIn: accessTokenTtl });
                    return [2 /*return*/, accessToken];
                });
            });
        };
        this.setHeader = function (res, accessToken, refreshToken) {
            var JWT_COOKIE_ACCESS_TOKEN = (0, lodash_2.toNumber)(process.env.JWT_COOKIE_ACCESS_TOKEN);
            var JWT_COOKIE_REFRESH_TOKEN = (0, lodash_2.toNumber)(process.env.JWT_COOKIE_REFRESH_TOKEN);
            res.setHeader('x-access-token', cookie_1.default.serialize('access_token', accessToken, {
                httpOnly: true,
                expires: new Date(Date.now() + JWT_COOKIE_ACCESS_TOKEN),
                sameSite: 'strict',
                path: '/',
                secure: process.env.NODE_ENV === 'development' ? false : true,
            }));
            res.setHeader('x-refresh', cookie_1.default.serialize('refresh_token', refreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + JWT_COOKIE_REFRESH_TOKEN),
                sameSite: 'strict',
                path: '/',
                secure: process.env.NODE_ENV === 'development' ? false : true,
            }));
        };
        this.createRefreshToken = function (_a) {
            var session = _a.session;
            return __awaiter(_this, void 0, void 0, function () {
                var refreshTokenTtl, refreshToken;
                return __generator(this, function (_b) {
                    refreshTokenTtl = process.env.REFRESH_TOKEN_TTL;
                    refreshToken = (0, jwt_util_1.sign)(__assign({}, session), {
                        expiresIn: refreshTokenTtl,
                    });
                    return [2 /*return*/, refreshToken];
                });
            });
        };
        this.reIssueAccessToken = function (_a) {
            var refreshToken = _a.refreshToken;
            return __awaiter(_this, void 0, void 0, function () {
                var decoded, deco, session, user, accessToken;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            decoded = (0, jwt_util_1.decode)(refreshToken).decoded;
                            if (!(!decoded || !(0, lodash_1.get)(decoded, '_id'))) return [3 /*break*/, 3];
                            deco = jsonwebtoken_1.default.decode(refreshToken);
                            if (!(deco && (0, lodash_1.get)(deco, '_id'))) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.deleteSessions({
                                    _id: (0, lodash_1.get)(deco, '_id'),
                                })];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2: return [2 /*return*/, false];
                        case 3: return [4 /*yield*/, Session_model_1.default.findById((0, lodash_1.get)(decoded, '_id'))];
                        case 4:
                            session = _b.sent();
                            if (!session || !(session === null || session === void 0 ? void 0 : session.valid))
                                return [2 /*return*/, false];
                            return [4 /*yield*/, this.userService.findUser({ _id: session.user })];
                        case 5:
                            user = _b.sent();
                            if (!user)
                                return [2 /*return*/, false];
                            accessToken = this.createAccessToken({ user: user, session: session });
                            return [2 /*return*/, accessToken];
                    }
                });
            });
        };
        this.updateSession = function (query, update) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Session_model_1.default.updateOne(query, update)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.deleteSessions = function (query) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Session_model_1.default.deleteMany(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.findSessions = function (query) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Session_model_1.default.find(query).lean()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.userService = new user_service_1.default();
    }
    return SessionService;
}());
exports.default = SessionService;
