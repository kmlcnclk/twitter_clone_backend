import express, { Router } from 'express';
import UserRouter from './user.router';
import SessionRouter from './session.router';
import VerificationRouter from './verification.router';
import MessageRouter from './message.router';
import ChatRouter from './chat.router';

const router: Router = express.Router();

class MainRouter {
  constructor() {
    router.use('/user', UserRouter);
    router.use('/session', SessionRouter);
    router.use('/verification', VerificationRouter);
    router.use('/chat', ChatRouter);
    router.use('/message', MessageRouter);
  }
}
new MainRouter();

export default router;
