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
var lodash_1 = require("lodash");
var jwt_util_1 = require("../utils/jwt.util");
var session_service_1 = __importDefault(require("../services/session.service"));
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var Session_model_1 = __importDefault(require("../models/Session.model"));
var cookie_1 = __importDefault(require("cookie"));
var deserializeUser = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sessionService, accessToken, refreshToken, _a, decoded, expired, session, newAccessToken, JWT_COOKIE_ACCESS_TOKEN, decoded_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sessionService = new session_service_1.default();
                accessToken = (0, lodash_1.get)(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
                refreshToken = (0, lodash_1.get)(req, 'headers.x-refresh');
                if (!accessToken)
                    return [2 /*return*/, next()];
                _a = (0, jwt_util_1.decode)(accessToken), decoded = _a.decoded, expired = _a.expired;
                if (!decoded) return [3 /*break*/, 2];
                return [4 /*yield*/, Session_model_1.default.findById((0, lodash_1.get)(decoded, 'session'))];
            case 1:
                session = _b.sent();
                if (!session || !(session === null || session === void 0 ? void 0 : session.valid))
                    return [2 /*return*/, next()];
                //@ts-ignore
                req.user = decoded;
                return [2 /*return*/, next()];
            case 2:
                if (!(expired && refreshToken)) return [3 /*break*/, 4];
                return [4 /*yield*/, sessionService.reIssueAccessToken({
                        refreshToken: refreshToken,
                    })];
            case 3:
                newAccessToken = _b.sent();
                if (newAccessToken) {
                    JWT_COOKIE_ACCESS_TOKEN = (0, lodash_1.toNumber)(process.env.JWT_COOKIE_ACCESS_TOKEN);
                    res.setHeader('x-access-token', cookie_1.default.serialize('access_token', newAccessToken, {
                        httpOnly: true,
                        expires: new Date(Date.now() + JWT_COOKIE_ACCESS_TOKEN),
                        sameSite: 'strict',
                        path: '/',
                        secure: process.env.NODE_ENV === 'development' ? false : true,
                    }));
                    decoded_1 = (0, jwt_util_1.decode)(newAccessToken).decoded;
                    //@ts-ignore
                    req.user = decoded_1;
                }
                return [2 /*return*/, next()];
            case 4: return [2 /*return*/, next()];
        }
    });
}); });
exports.default = deserializeUser;
