import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { get } from 'lodash';
import { ChatDocument } from '../models/Chat.model';
import { UserDocument } from '../models/User.model';
import ChatService from '../services/chat.service';
import UserService from '../services/user.service';

class ChatController {
  chatService: ChatService;
  userService: UserService;
  constructor() {
    this.chatService = new ChatService();
    this.userService = new UserService();
  }

  public createChat = expressAsyncHandler(
    //@ts-ignore
    async (req: Request, res: Response) => {
      const { _id } = req.body;
      const userId = get(req, 'user._id');

      const data = {
        users: [userId, _id],
      };

      const chat: ChatDocument & ChatDocument['_id'] =
        await this.chatService.createChat(data);

      await data.users.forEach(async (_id) => {
        await this.userService.addChatToUser(_id, chat._id);
      });

      return res.status(201).json({
        success: true,
        message: 'Chat successfully created',
      });
    }
  );

  public getChatsFromUser = expressAsyncHandler(
    //@ts-ignore
    async (req: Request, res: Response) => {
      const { _id } = get(req, 'user');
      let chatList: any = [];

      const user: UserDocument & UserDocument['_id'] =
        await this.userService.findUser({ _id });

      let chat: ChatDocument & ChatDocument['_id'];

      for (let i = 0; i < user.chats.length; i++) {
        chat = await this.chatService.findChat({
          _id: user.chats[i],
        });
        await chatList.push(chat);
      }

      return res.status(200).json({
        success: true,
        chatList,
      });
    }
  );
}

export default ChatController;
