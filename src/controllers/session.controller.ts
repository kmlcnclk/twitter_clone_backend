import expressAsyncHandler from 'express-async-handler';
import CustomError from '../errors/CustomError';
import SessionService from '../services/session.service';
import UserService from '../services/user.service';
import { Request, Response } from 'express';
import { get } from 'lodash';

class SessionController {
  sessionService: SessionService;
  userService: UserService;

  constructor() {
    this.sessionService = new SessionService();
    this.userService = new UserService();
  }

  public createUserSession = expressAsyncHandler(
    //@ts-ignore
    async (req: Request, res: Response) => {
      const user = await this.userService.validatePassword(req.body);

      if (!user)
        throw new CustomError('Unauthorized', 'Invalid email or password', 401);

      const session = await this.sessionService.createSession(
        user._id,
        req.get('user-agent') || ''
      );

      const accessToken = await this.sessionService.createAccessToken({
        user,
        session,
      });

      const refreshToken = await this.sessionService.createRefreshToken({
        session,
      });

      await this.sessionService.setHeader(res, accessToken, refreshToken);

      return res.status(201).json({
        success: true,
        accessToken,
        refreshToken,
      });
    }
  );

  public invalidateUserSession = expressAsyncHandler(
    //@ts-ignore
    async (req: Request, res: Response) => {
      const sessionId = get(req, 'user.session');

      await this.sessionService.updateSession(
        { _id: sessionId },
        { valid: false }
      );

      return res.status(200).json({
        success: true,
        message: 'Session successfully invalidated',
      });
    }
  );

  public deleteUserSessions = expressAsyncHandler(
    //@ts-ignore
    async (req: Request, res: Response) => {
      const userId = get(req, 'user._id');

      await this.sessionService.deleteSessions({ user: userId, valid: false });

      return res.status(200).json({
        success: true,
        message: 'Session successfully deleted',
      });
    }
  );

  public getUserSessions = expressAsyncHandler(
    //@ts-ignore
    async (req: Request, res: Response) => {
      const userId = get(req, 'user._id');

      const sessions = await this.sessionService.findSessions({
        user: userId,
        valid: true,
      });

      return res.status(200).json({
        success: true,
        sessions,
      });
    }
  );
}

export default SessionController;
