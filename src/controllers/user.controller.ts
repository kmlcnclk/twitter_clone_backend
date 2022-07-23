import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import UserService from '../services/user.service';
import SessionService from '../services/session.service';
import { get } from 'lodash';
import slugify from 'slugify';

class UserController {
  userService: UserService;
  sessionService: SessionService;
  constructor() {
    this.userService = new UserService();
    this.sessionService = new SessionService();
  }

  public getAllUser = expressAsyncHandler((req: Request, res: Response) => {
    res.send('aslanım');
  });

  public register = expressAsyncHandler(
    //@ts-ignore
    async (req: Request, res: Response) => {
      const name = req.body?.name;

      const username = slugify(name, {
        replacement: '',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      });

      const data = {
        ...req.body,
        username: username + Math.round(Math.random() * 10000000000),
      };

      const user = await this.userService.register(data);

      const session = await this.sessionService.createSession(
        user._id,
        req.get('user-agent') || ''
      );

      const accessToken = await this.sessionService.createAccessToken({
        user: get(user, '_doc'),
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
}

export default UserController;
