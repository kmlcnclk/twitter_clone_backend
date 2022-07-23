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
var CustomError_1 = __importDefault(require("../errors/CustomError"));
var sendEmail_1 = __importDefault(require("../helpers/sendEmail"));
var Verification_model_1 = __importDefault(require("../models/Verification.model"));
var user_service_1 = __importDefault(require("./user.service"));
var VerificationService = /** @class */ (function () {
    function VerificationService() {
        var _this = this;
        this.createVerificationWithEmail = function (email, code) { return __awaiter(_this, void 0, void 0, function () {
            var VERIFICATION_CODE_EXPIRE;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        VERIFICATION_CODE_EXPIRE = (0, lodash_1.toNumber)(process.env.VERIFICATION_CODE_EXPIRE);
                        return [4 /*yield*/, Verification_model_1.default.create({
                                email: email,
                                code: code,
                                codeExpire: Date.now() + VERIFICATION_CODE_EXPIRE,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.deleteVerifications = function (query) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Verification_model_1.default.deleteMany(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.findVerification = function (query) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Verification_model_1.default.findOne(query).lean()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.checkEmailVerificationCode = function (_a) {
            var email = _a.email, code = _a.code;
            return __awaiter(_this, void 0, void 0, function () {
                var verification, user, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.findVerification({ email: email, code: code })];
                        case 1:
                            verification = _c.sent();
                            if (!verification)
                                throw new CustomError_1.default('Invalid Token', 'Invalid token please try again', 400);
                            if (!((0, lodash_1.get)(verification, 'codeExpire') < Date.now())) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.deleteVerifications({ email: email })];
                        case 2:
                            _c.sent();
                            throw new CustomError_1.default('Expired Token', 'Expired token please try again', 400);
                        case 3: return [4 /*yield*/, this.userService.findUserWithoutLean({
                                email: email,
                            })];
                        case 4:
                            user = _c.sent();
                            if (!!user) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.deleteVerifications({ email: email })];
                        case 5:
                            _c.sent();
                            throw new CustomError_1.default('Bad Request', "This user isn't available here", 400);
                        case 6:
                            _b = user;
                            return [4 /*yield*/, true];
                        case 7:
                            _b.emailVerified = _c.sent();
                            return [4 /*yield*/, user.save()];
                        case 8:
                            _c.sent();
                            return [4 /*yield*/, this.deleteVerifications({ email: email })];
                        case 9:
                            _c.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.verificationEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var SMTP_USER, randomNumber, emailTemplate, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        SMTP_USER = process.env.SMTP_USER;
                        randomNumber = (0, lodash_1.toInteger)(Math.random() * 900000 + 100000);
                        emailTemplate = "\n     <h3>Confirm your email address</h3>\n     <br/>\n     <p>There\u2019s one quick step you need to complete before creating your Twitter account. Let\u2019s make sure this is the right email address for you \u2014 please confirm this is the right address to use for your new account.\n     </p>\n      <br/>\n      <p>Please enter this verification code to get started on Twitter:</p>\n     <h2>".concat(randomNumber, "</h2>\n     <p>Verification codes expire after two hours.</p>\n     <p>Thanks, Twitter</p>\n    ");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.deleteVerifications({ email: email })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.createVerificationWithEmail(email, randomNumber)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, sendEmail_1.default)({
                                from: SMTP_USER,
                                to: email,
                                subject: "".concat(randomNumber, " is your Twitter verification code"),
                                html: emailTemplate,
                            })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        throw new CustomError_1.default('Nodemailer Error', "Email cloudn't be sent", 500);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.userService = new user_service_1.default();
    }
    return VerificationService;
}());
exports.default = VerificationService;
