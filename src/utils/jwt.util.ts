import jwt from 'jsonwebtoken';

export const sign = (object: Object, options?: jwt.SignOptions | undefined) => {
  const privateKey = process.env.PRIVATE_KEY as string;
  return jwt.sign(object, privateKey, options);
};

export const decode = (token: string) => {
  try {
    const privateKey = process.env.PRIVATE_KEY as string;
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === 'jwt expired',
      decoded: null,
    };
  }
};