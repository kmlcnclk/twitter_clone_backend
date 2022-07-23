import { get, toNumber } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { decode } from '../utils/jwt.util';
import SessionService from '../services/session.service';
import expressAsyncHandler from 'express-async-handler';
import Session from '../models/Session.model';
import cookie from 'cookie';

const deserializeUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const sessionService = new SessionService();

    const accessToken = get(req, 'headers.authorization', '').replace(
      /^Bearer\s/,
      ''
    );

    const refreshToken = get(req, 'headers.x-refresh');

    if (!accessToken) return next();

    const { decoded, expired } = decode(accessToken);

    if (decoded) {
      const session = await Session.findById(get(decoded, 'session'));

      if (!session || !session?.valid) return next();

      //@ts-ignore
      req.user = decoded;
      return next();
    }

    if (expired && refreshToken) {
      const newAccessToken = await sessionService.reIssueAccessToken({
        refreshToken,
      });

      if (newAccessToken) {
        const JWT_COOKIE_ACCESS_TOKEN = toNumber(
          process.env.JWT_COOKIE_ACCESS_TOKEN
        ) as number;

        res.setHeader(
          'x-access-token',
          cookie.serialize('access_token', newAccessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + JWT_COOKIE_ACCESS_TOKEN),
            sameSite: 'strict',
            path: '/',
            secure: process.env.NODE_ENV === 'development' ? false : true,
          })
        );

        const { decoded } = decode(newAccessToken);
        //@ts-ignore
        req.user = decoded;
      }
      return next();
    }
    return next();
  }
);

export default deserializeUser;
