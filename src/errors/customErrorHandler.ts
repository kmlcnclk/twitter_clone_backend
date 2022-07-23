import { NextFunction, Request, Response } from 'express';
import CustomError from './CustomError';
import log from '../logger';

interface CustomErrorType {
  name: string;
  code?: number;
  message: string;
  status: number;
  errno?: number;
}

// Custom error handler
const customErrorHandler = (
  err: CustomErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = err;

  if (err.name === 'SyntaxError') {
    customError = new CustomError(err.name, 'Unexpected Syntax', 400);
  }
  if (err.name === 'ValidationError') {
    customError = new CustomError(err.name, err.message, 400);
  }
  if (err.name === 'CastError') {
    customError = new CustomError(err.name, 'Please provide a valid id', 400);
  }
  // if (err.code === 11000) {
  //   customError = new CustomError(
  //     err.name,
  //     'Duplicate Key Found : Check Your Input',
  //     400
  //   );
  // }
  // if (err.name === 'TypeError') {
  //   customError = new CustomError(
  //     err.name,
  //     'Type Error : Please Check Your Input',
  //     400
  //   );
  // }

  log.error(
    `Name: ${customError.name}, Status Code: ${
      customError.status || 500
    }, Message: ${customError.message}`
  );

  return res.status(customError.status || 500).json({
    success: false,
    error: { message: customError.message, status: customError.status || 500 },
  });
};

export default customErrorHandler;
