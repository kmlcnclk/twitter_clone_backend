import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import CustomError from '../errors/CustomError';
import ChatService from '../services/chat.service';

class MessageMiddleware {
  chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  public isChatAvailable = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { chatId } = req.body;

      const chat = await this.chatService.findChat({ _id: chatId });

      if (!chat) {
        throw new CustomError('Not Found', "This chat couldn't found", 404);
      }

      next();
    }
  );
}

export default MessageMiddleware;
