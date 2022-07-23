import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { get } from 'lodash';
import MessageService from '../services/message.service';
import ChatService from '../services/chat.service';
import { MessageDocument } from '../models/Message.model';

class MessageController {
  messageService: MessageService;
  chatService: ChatService;
  constructor() {
    this.messageService = new MessageService();
    this.chatService = new ChatService();
  }

  public createMessage = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const userId = get(req, 'user._id');
      const { chatId, content } = req.body;

      const data = {
        chatId,
        userId,
        content,
      };

      const message: MessageDocument & MessageDocument['_id'] =
        await this.messageService.createMessage(data);

      await this.chatService.addMessageToChat(chatId, message._id);

      res.status(201).json({
        success: true,
        message: 'Message successfully created',
      });
    }
  );
}

export default MessageController;
