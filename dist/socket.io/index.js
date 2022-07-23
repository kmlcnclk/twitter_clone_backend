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
var socket_io_1 = require("socket.io");
var CustomError_1 = __importDefault(require("../errors/CustomError"));
var chat_service_1 = __importDefault(require("../services/chat.service"));
var jwt_util_1 = require("../utils/jwt.util");
var lodash_1 = require("lodash");
var user_service_1 = __importDefault(require("../services/user.service"));
var message_service_1 = __importDefault(require("../services/message.service"));
var SocketIO = /** @class */ (function () {
    function SocketIO(server) {
        this.io = new socket_io_1.Server(server, {
            cors: { origin: '*' },
        });
        this.chatService = new chat_service_1.default();
        this.userService = new user_service_1.default();
        this.messageService = new message_service_1.default();
        // this.chatsNamespace = this.io.of('/chats');
        // this.messagesNamespace = this.io.of('/messages');
        // this.connect();
        this.middlewares();
        // this.chats();
        this.messages();
    } // ya bu socket io nun farklı bir yerde olması lazım yad abu işte bir işlik var çünkü bu yavaş
    SocketIO.prototype.connect = function () {
        this.io.on('connection', function (socket) {
            socket.on('get-chats-from-user', function () { });
        });
        this.io.on('connect_error', function (err) {
            throw new CustomError_1.default(err.name, err.message, err.code);
        });
    };
    SocketIO.prototype.middlewares = function () {
        // this.chatsNamespace.use((socket, next) => {
        //   // buraya refresh token eklenebilir haberin olsun tıpkı middlewarelardaki deserialize gibi mi ne öle bişey clientden hep access hem de refresh gelir falan.
        //   if (socket.handshake.auth.token) {
        //     const { decoded } = decode(socket.handshake.auth.token);
        //     //@ts-ignore
        //     socket.user = decoded;
        //     return next();
        //   }
        //   throw next(
        //     new CustomError(
        //       'Unauthorized Error',
        //       'You cannot enter here without an Access Token',
        //       401
        //     )
        //   );
        // });
        this.io.use(function (socket, next) {
            if (socket.handshake.auth.token) {
                var decoded = (0, jwt_util_1.decode)(socket.handshake.auth.token).decoded;
                //@ts-ignore
                socket.user = decoded;
                return next();
            }
            throw next(new CustomError_1.default('Unauthorized Error', 'You cannot enter here without an Access Token', 401));
        });
    };
    // chats() {
    //   this.chatsNamespace.on('connection', (socket) => {
    //     // create-chat
    //     socket.on('create-chat', async (id: string) => {
    //       const { _id } = get(socket, 'user');
    //       const data = {
    //         users: [_id, id],
    //       };
    //       const chat: ChatDocument & ChatDocument['_id'] =
    //         await this.chatService.createChat(data);
    //       await data.users.forEach(async (_id: string) => {
    //         await this.userService.addChatToUser(_id, chat._id);
    //       });
    //       const result = 'Chat successfully created';
    //       socket.join(_id);
    //       this.chatsNamespace.to(_id).emit('create-chat', result);
    //       // socket.leave(_id);
    //     });
    //     // get-chats-from-user
    //     socket.on('get-chats-from-user', async () => {
    //       const { _id } = get(socket, 'user');
    //       console.log('User ID: ', _id);
    //       let chatList: any = [];
    //       const user: UserDocument & UserDocument['_id'] =
    //         await this.userService.findUser({ _id });
    //       let chat: ChatDocument & ChatDocument['_id'];
    //       for (let i = 0; i < user.chats.length; i++) {
    //         chat = await this.chatService.findChat({
    //           _id: user.chats[i],
    //         });
    //         await chatList.push(chat);
    //       }
    //       // if (chat) {
    //       //   let otherUser: any = {};
    //       //   for (let i = 0; i < chat.users.length; i++) {
    //       //     if (_id != chat.users[i]) {
    //       //       otherUser = await this.userService.findUser({
    //       //         _id: chat.users[i],
    //       //       });
    //       //     }
    //       //   }
    //       //   const lastMessage = await this.messageService.findMessage({
    //       //     _id: chat.messages[chat.messages.length - 1],
    //       //   });
    //       //   socket.join(_id);
    //       //   this.chatsNamespace
    //       //     .to(_id)
    //       //     .emit('get-chats-from-user', { chatList, otherUser, lastMessage });
    //       // }
    //       socket.join(_id);
    //       this.chatsNamespace.to(_id).emit('get-chats-from-user', { chatList });
    //       // socket.leave(_id);
    //     });
    //   });
    //   this.chatsNamespace.on('connect_error', (err) => {
    //     throw new CustomError(err.name, err.message, err.code);
    //   });
    // }
    SocketIO.prototype.messages = function () {
        var _this = this;
        this.io.on('connection', function (socket) {
            // create-message
            socket.on('create-message', function (chatId, content) { return __awaiter(_this, void 0, void 0, function () {
                var _id, data, message, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log(content);
                            _id = (0, lodash_1.get)(socket, 'user')._id;
                            data = {
                                chatId: chatId,
                                userId: _id,
                                content: content,
                            };
                            return [4 /*yield*/, this.messageService.createMessage(data)];
                        case 1:
                            message = _a.sent();
                            return [4 /*yield*/, this.chatService.addMessageToChat(chatId, message._id)];
                        case 2:
                            _a.sent();
                            result = 'Message successfully created';
                            //buradaki room adi chat id değilde iki userın id birleşimi olabilri buna bak
                            console.log(content);
                            socket.join(chatId);
                            this.io.to(chatId).emit('create-message', result);
                            return [2 /*return*/];
                    }
                });
            }); });
            // get-messages-from-chat
            socket.on('get-messages-from-chat', function (chatId) { return __awaiter(_this, void 0, void 0, function () {
                var _id, chat, messagesList, i, message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _id = (0, lodash_1.get)(socket, 'user')._id;
                            return [4 /*yield*/, this.chatService.findChat({ _id: chatId })];
                        case 1:
                            chat = _a.sent();
                            messagesList = [];
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < chat.messages.length)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.messageService.findMessage({
                                    _id: chat.messages[i],
                                })];
                        case 3:
                            message = _a.sent();
                            return [4 /*yield*/, messagesList.push(message)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            i++;
                            return [3 /*break*/, 2];
                        case 6:
                            //buradaki room adi chat id değilde iki userın id birleşimi olabilri buna bak
                            socket.join(chatId);
                            // console.log(_id);
                            // room dan kaynaklanan bir sorun var kaldırınca düzeliyor ama kaldırmam saçma bir çözüm
                            this.io.to(chatId).emit('get-messages-from-chat', { messagesList: messagesList });
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        this.io.on('connect_error', function (err) {
            throw new CustomError_1.default(err.name, err.message, err.code);
        });
    };
    return SocketIO;
}());
exports.default = SocketIO;
