import express, { Router } from 'express';
import SessionController from '../controllers/session.controller';
import { requiresUser, validateRequest } from '../middlewares';
import { createSessionSchema } from '../schemas/session.schema';

const router: Router = express.Router();

class SessionRouter {
  userController: SessionController;

  constructor() {
    this.userController = new SessionController();
    this.gets();
    this.posts();
    this.deletes();
    this.patches();
  }

  private gets() {
    router.get(
      '/getUserSessions',
      requiresUser,
      this.userController.getUserSessions
    );
  }

  private posts() {
    router.post(
      '/createUserSession',
      validateRequest(createSessionSchema),
      this.userController.createUserSession
    );
  }

  private deletes() {
    router.delete(
      '/deleteUserSessions',
      requiresUser,
      this.userController.deleteUserSessions
    );
  }

  private patches() {
    router.patch(
      '/invalidateUserSession',
      requiresUser,
      this.userController.invalidateUserSession
    );
  }
}

new SessionRouter();

export default router;
