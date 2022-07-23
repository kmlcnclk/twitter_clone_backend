import { Server, ServerOptions, Namespace } from 'socket.io';
import CustomError from '../errors/CustomError';
import ChatService from '../services/chat.service';
import { decode } from '../utils/jwt.util';
import { forEach, get } from 'lodash';
import UserService from '../services/user.service';
import MessageService from '../services/message.service';
import { ChatDocument } from '../models/Chat.model';
import { MessageDocument } from '../models/Message.model';
import { UserDocument } from '../models/User.model';

class SocketIO {
  io: Server;
  // chatsNamespace: Namespace;
  // messagesNamespace: Namespace;
  chatService: ChatService;
  userService: UserService;
  messageService: MessageService;
  constructor(server: Partial<ServerOptions>) {
    this.io = new Server(server, {
      cors: { origin: '*' },
    });
    this.chatService = new ChatService();
    this.userService = new UserService();
    this.messageService = new MessageService();
    // this.chatsNamespace = this.io.of('/chats');
    // this.messagesNamespace = this.io.of('/messages');
    // this.connect();
    this.middlewares();
    // this.chats();
    this.messages();
  } // ya bu socket io nun farklı bir yerde olması lazım yad abu işte bir işlik var çünkü bu yavaş

  connect() {
    this.io.on('connection', (socket) => {
      socket.on('get-chats-from-user', () => {});
    });
    this.io.on('connect_error', (err) => {
      throw new CustomError(err.name, err.message, err.code);
    });
  }

  middlewares() {
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

    this.io.use((socket, next) => {
      if (socket.handshake.auth.token) {
        const { decoded } = decode(socket.handshake.auth.token);
        //@ts-ignore
        socket.user = decoded;
        return next();
      }
      throw next(
        new CustomError(
          'Unauthorized Error',
          'You cannot enter here without an Access Token',
          401
        )
      );
    });
  }

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

  messages() {
    this.io.on('connection', (socket) => {
      // create-message
      socket.on('create-message', async (chatId: string, content: string) => {
        console.log(content);
        const { _id } = get(socket, 'user');
        //create messages çalışmıyor bak buna oda ayarını yap
        const data = {
          chatId,
          userId: _id,
          content,
        };

        const message: MessageDocument & MessageDocument['_id'] =
          await this.messageService.createMessage(data);

        await this.chatService.addMessageToChat(chatId, message._id);

        const result = 'Message successfully created';

        //buradaki room adi chat id değilde iki userın id birleşimi olabilri buna bak
        console.log(content);
        socket.join(chatId);

        this.io.to(chatId).emit('create-message', result);
      });

      // get-messages-from-chat
      socket.on('get-messages-from-chat', async (chatId: string) => {
        const { _id } = get(socket, 'user');

        const chat: ChatDocument & ChatDocument['_id'] =
          await this.chatService.findChat({ _id: chatId });

        let messagesList: any = [];
        for (let i = 0; i < chat.messages.length; i++) {
          const message: MessageDocument & MessageDocument['_id'] =
            await this.messageService.findMessage({
              _id: chat.messages[i],
            });

          await messagesList.push(message);
        }

        //buradaki room adi chat id değilde iki userın id birleşimi olabilri buna bak
        socket.join(chatId);
        // console.log(_id);
        // room dan kaynaklanan bir sorun var kaldırınca düzeliyor ama kaldırmam saçma bir çözüm
        this.io.to(chatId).emit('get-messages-from-chat', { messagesList });
      });
    });

    this.io.on('connect_error', (err) => {
      throw new CustomError(err.name, err.message, err.code);
    });
  }
}

export default SocketIO;
