import express, { Router } from 'express';
import ChatController from '../controllers/chat.controller';
import { createChatSchema } from '../schemas/chat.schema';
import { requiresUser, validateRequest } from '../middlewares';
import ChatMiddleware from '../middlewares/chat.middleware';

const router: Router = express.Router();

class MessageRouter {
  chatController: ChatController;
  chatMiddleware: ChatMiddleware;

  constructor() {
    this.chatController = new ChatController();
    this.chatMiddleware = new ChatMiddleware();
    this.gets();
    this.posts();
  }

  private gets() {
    router.get(
      '/getChatsFromUser',
      [requiresUser],
      this.chatController.getChatsFromUser
    );
  }

  private posts() {
    router.post(
      '/createChat',
      [
        requiresUser,
        validateRequest(createChatSchema),
        this.chatMiddleware.isUserAvailable,
      ],
      this.chatController.createChat
    );
  }
}

new MessageRouter();

export default router;
