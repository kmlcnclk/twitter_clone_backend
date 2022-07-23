import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import CustomError from '../errors/CustomError';

const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = get(req, 'user');

  if (!user)
    return res.status(401).json({
      success: false,
      message: 'You must have an access token or refresh token to enter here',
    });

  const userService = new UserService();

  const isUserAvailable = await userService.isUserAvailable({ _id: user._id });

  if (!isUserAvailable) {
    return next(new CustomError('Not Found', "This user couldn't found", 404));
  }
  return next();
};

export default requiresUser;
