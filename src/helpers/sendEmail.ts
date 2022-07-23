import { toNumber } from 'lodash';
import nodemailer from 'nodemailer';
import CustomError from '../errors/CustomError';
import log from '../logger';

const sendMail = async (mailOptions: any) => {
  try {
    const SMTP_HOST = process.env.SMTP_HOST as string;
    const SMTP_POST = toNumber(process.env.SMTP_POST) as number;
    const SMTP_USER = process.env.SMTP_USER as string;
    const SMTP_PASS = process.env.SMTP_PASS as string;

    let transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_POST,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    let info = await transporter.sendMail(mailOptions);
    log.info(`Message Sent : ${info}`);
  } catch (error: any) {
    throw new CustomError(error.name, error.message, 500);
  }
};

export default sendMail;
