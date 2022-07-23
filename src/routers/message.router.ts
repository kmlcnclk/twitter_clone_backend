import express, { Router } from 'express';
import MessageController from '../controllers/message.controller';
import { createMessageSchema } from '../schemas/message.schema';
import { requiresUser, validateRequest } from '../middlewares';
import MessageMiddleware from '../middlewares/message.middleware';

const router: Router = express.Router();

class MessageRouter {
  messageController: MessageController;
  messageMiddleware: MessageMiddleware;

  constructor() {
    this.messageController = new MessageController();
    this.messageMiddleware = new MessageMiddleware();
    this.posts();
  }

  private posts() {
    router.post(
      '/createMessage',
      [
        requiresUser,
        validateRequest(createMessageSchema),
        this.messageMiddleware.isChatAvailable,
      ],
      this.messageController.createMessage
    );
  }
}

new MessageRouter();

export default router;
