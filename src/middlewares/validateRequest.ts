import { AnySchema } from 'yup';
import { Response, Request, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';

const validate = (schema: AnySchema) =>
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    }
  );

export default validate;
