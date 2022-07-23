import { object, string, number } from 'yup';

export const verificationEmailSchema = object({
  body: object({
    email: string()
      .email('Must be a valid email')
      .required('Email is required'),
  }),
});

export const checkEmailVerificationCodeSchema = object({
  body: object({
    email: string()
      .email('Must be a valid email')
      .required('Email is required'),
    code: number().required('Verification Code is required'),
  }),
});
