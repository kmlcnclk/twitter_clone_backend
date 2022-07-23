import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import PublisherRabbitMQ from '../rabbitmq/publisher.rabbitmq';
import VerificationService from '../services/verification.service';

class VerificationController {
  verificationService: VerificationService;
  publisher: PublisherRabbitMQ;
  constructor() {
    this.verificationService = new VerificationService();
    this.publisher = new PublisherRabbitMQ();
  }

  public verificationEmail = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { email } = req.body;

      await this.publisher.verificationEmail('verificationEmail', email);

      res.status(200).json({
        success: true,
        message:
          'Mail has been successfully sent to your email. Please check your email',
      });
    }
  );

  public checkEmailVerificationCode = expressAsyncHandler(
    async (req: Request, res: Response) => {
      await this.verificationService.checkEmailVerificationCode(req.body);

      res.status(200).json({
        success: true,
        message: 'Verification is successful',
      });
    }
  );
}

export default VerificationController;
