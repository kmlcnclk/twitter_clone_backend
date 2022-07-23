import { get, toInteger, toNumber } from 'lodash';
import { FilterQuery } from 'mongoose';
import CustomError from '../errors/CustomError';
import sendEmail from '../helpers/sendEmail';
import Verification from '../models/Verification.model';
import UserService from './user.service';

class VerificationService {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public createVerificationWithEmail = async (email: string, code: number) => {
    const VERIFICATION_CODE_EXPIRE = toNumber(
      process.env.VERIFICATION_CODE_EXPIRE
    ) as number;
    await Verification.create({
      email,
      code,
      codeExpire: Date.now() + VERIFICATION_CODE_EXPIRE,
    });
  };

  public deleteVerifications = async (
    query: FilterQuery<VerificationService>
  ) => {
    return await Verification.deleteMany(query);
  };

  public findVerification = async (query: FilterQuery<VerificationService>) => {
    return await Verification.findOne(query).lean();
  };

  public checkEmailVerificationCode = async ({
    email,
    code,
  }: {
    email: string;
    code: number;
  }) => {
    const verification = await this.findVerification({ email, code });

    if (!verification)
      throw new CustomError(
        'Invalid Token',
        'Invalid token please try again',
        400
      );

    if (get(verification, 'codeExpire') < Date.now()) {
      await this.deleteVerifications({ email });

      throw new CustomError(
        'Expired Token',
        'Expired token please try again',
        400
      );
    }

    const user = await this.userService.findUserWithoutLean({
      email,
    });

    if (!user) {
      await this.deleteVerifications({ email });
      throw new CustomError(
        'Bad Request',
        "This user isn't available here",
        400
      );
    }

    user.emailVerified = await true;
    await user.save();

    await this.deleteVerifications({ email });

    // codeExpire: { $gt: Date.now() }
  };

  public verificationEmail = async (email: string) => {
    const SMTP_USER = process.env.SMTP_USER as string;

    const randomNumber = toInteger(Math.random() * 900000 + 100000);

    const emailTemplate = `
     <h3>Confirm your email address</h3>
     <br/>
     <p>There’s one quick step you need to complete before creating your Twitter account. Let’s make sure this is the right email address for you — please confirm this is the right address to use for your new account.
     </p>
      <br/>
      <p>Please enter this verification code to get started on Twitter:</p>
     <h2>${randomNumber}</h2>
     <p>Verification codes expire after two hours.</p>
     <p>Thanks, Twitter</p>
    `;

    try {
      await this.deleteVerifications({ email });

      await this.createVerificationWithEmail(email, randomNumber);

      await sendEmail({
        from: SMTP_USER,
        to: email,
        subject: `${randomNumber} is your Twitter verification code`,
        html: emailTemplate,
      });
    } catch (err) {
      throw new CustomError('Nodemailer Error', "Email cloudn't be sent", 500);
    }
  };
}

export default VerificationService;
