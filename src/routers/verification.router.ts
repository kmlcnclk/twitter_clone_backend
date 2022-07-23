import express, { Router } from 'express';
import VerificationController from '../controllers/verification.controller';
import { validateRequest } from '../middlewares';
import {
  verificationEmailSchema,
  checkEmailVerificationCodeSchema,
} from '../schemas/verification.schema';

const router: Router = express.Router();

class VerificationRouter {
  verificationController: VerificationController;
  constructor() {
    this.verificationController = new VerificationController();
    this.gets();
    this.posts();
  }

  private gets() {
    router.get(
      '/verificationEmail',
      validateRequest(verificationEmailSchema),
      this.verificationController.verificationEmail
    );
  }

  private posts() {
    router.post(
      '/checkEmailVerificationCode',
      validateRequest(checkEmailVerificationCodeSchema),
      this.verificationController.checkEmailVerificationCode
    );
  }
}

new VerificationRouter();

export default router;
