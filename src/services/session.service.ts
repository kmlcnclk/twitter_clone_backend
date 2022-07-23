import Session, { SessionDocument } from '../models/Session.model';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { sign, decode } from '../utils/jwt.util';
import { get } from 'lodash';
import UserService from './user.service';
import { Response } from 'express';
import cookie from 'cookie';
import { toNumber } from 'lodash';
import jwt from 'jsonwebtoken';

class SessionService {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public createSession = async (userId: string, userAgent: string) => {
    const session = await Session.create({ user: userId, userAgent });

    return session.toJSON();
  };

  public createAccessToken = async ({ user, session }: any) => {
    const accessTokenTtl = process.env.ACCESS_TOKEN_TTL as string;

    const accessToken = sign(
      { ...user, session: session._id },
      { expiresIn: accessTokenTtl }
    );

    return accessToken;
  };

  public setHeader = (
    res: Response,
    accessToken: string,
    refreshToken: string
  ) => {
    const JWT_COOKIE_ACCESS_TOKEN = toNumber(
      process.env.JWT_COOKIE_ACCESS_TOKEN
    ) as number;
    const JWT_COOKIE_REFRESH_TOKEN = toNumber(
      process.env.JWT_COOKIE_REFRESH_TOKEN
    ) as number;

    res.setHeader(
      'x-access-token',
      cookie.serialize('access_token', accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + JWT_COOKIE_ACCESS_TOKEN),
        sameSite: 'strict',
        path: '/',
        secure: process.env.NODE_ENV === 'development' ? false : true,
      })
    );
    res.setHeader(
      'x-refresh',
      cookie.serialize('refresh_token', refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + JWT_COOKIE_REFRESH_TOKEN),
        sameSite: 'strict',
        path: '/',
        secure: process.env.NODE_ENV === 'development' ? false : true,
      })
    );
  };

  public createRefreshToken = async ({ session }: any) => {
    const refreshTokenTtl = process.env.REFRESH_TOKEN_TTL as string;

    const refreshToken = sign(
      { ...session },
      {
        expiresIn: refreshTokenTtl,
      }
    );

    return refreshToken;
  };

  public reIssueAccessToken = async ({
    refreshToken,
  }: {
    refreshToken: string;
  }) => {
    const { decoded } = decode(refreshToken);

    if (!decoded || !get(decoded, '_id')) {
      const deco = jwt.decode(refreshToken);
      if (deco && get(deco, '_id')) {
        await this.deleteSessions({
          _id: get(deco, '_id'),
        });
      }

      return false;
    }

    const session = await Session.findById(get(decoded, '_id'));

    if (!session || !session?.valid) return false;

    const user = await this.userService.findUser({ _id: session.user });

    if (!user) return false;

    const accessToken = this.createAccessToken({ user, session });

    return accessToken;
  };

  public updateSession = async (
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
  ) => {
    return await Session.updateOne(query, update);
  };

  public deleteSessions = async (query: FilterQuery<SessionDocument>) => {
    return await Session.deleteMany(query);
  };

  public findSessions = async (query: FilterQuery<SessionDocument>) => {
    return await Session.find(query).lean();
  };
}

export default SessionService;
