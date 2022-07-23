import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import CustomError from '../errors/CustomError';
import UserService from '../services/user.service';

class UserMiddleware {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public register = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, phone } = req.body;

      if (!phone && !email)
        throw new CustomError(
          'Bad Request',
          'Phone or Email field required',
          400
        );

      if (email) await this.isEmailAlreadyExist(email);
      else if (phone) await this.isPhoneAlreadyExist(phone);

      next();
    }
  );

  private isEmailAlreadyExist = async (email: string) => {
    const isEmailAlreadyExist = await this.userService.findUser({ email });

    if (isEmailAlreadyExist)
      throw new CustomError('Bad Request', 'Email should be unique', 400);
  };

  private isPhoneAlreadyExist = async (phone: string) => {
    const isPhoneAlreadyExist = await this.userService.findUser({ phone });

    if (isPhoneAlreadyExist)
      throw new CustomError('Bad Request', 'Phone should be unique', 400);
  };

  private isUsernameAlreadyExist = async (username: string) => {
    const isUsernameAlreadyExist = await this.userService.findUser({
      username,
    });

    if (isUsernameAlreadyExist)
      throw new CustomError('Bad Request', 'Username should be unique', 400);
  };
}

export default UserMiddleware;
