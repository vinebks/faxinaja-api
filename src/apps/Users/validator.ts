import yup from '@config/yup';
import { Request, Response, NextFunction } from 'express';

export const validateUserPayload = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  await yup
    .object()
    .shape({
      name: yup.string().required(),
      document: yup.string().length(11).required(),
      password: yup.string().min(6).max(10).required(),
    })
    .validate(req.body, { abortEarly: false });

  return next();
};
