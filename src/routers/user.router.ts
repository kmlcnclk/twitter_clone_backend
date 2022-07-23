import express, { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validateRequest } from '../middlewares';
import UserMiddleware from '../middlewares/user.middleware';
import { registerUserSchema } from '../schemas/user.schema';

const router: Router = express.Router();

class UserRouter {
  userController: UserController;
  userMiddleware: UserMiddleware;

  constructor() {
    this.userController = new UserController();
    this.userMiddleware = new UserMiddleware();
    this.gets();
    this.posts();
  }

  private gets() {
    router.get('/getAllUser', this.userController.getAllUser);
  }

  private posts() {
    router.post(
      '/register',
      [validateRequest(registerUserSchema), this.userMiddleware.register],
      this.userController.register
    );
  }
}

new UserRouter();

export default router;
