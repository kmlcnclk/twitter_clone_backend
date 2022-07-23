import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import CustomError from '../errors/CustomError';
import UserService from '../services/user.service';

class ChatMiddleware {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public isUserAvailable = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { _id } = req.body;

      const isUserAvailable = await this.userService.isUserAvailable({ _id });

      if (!isUserAvailable) {
        throw new CustomError('Not Found', "This user couldn't found", 404);
      }

      next();
    }
  );
}

export default ChatMiddleware;
