import yup from '@config/yup';
import { NextFunction, Request, Response } from 'express';

export const validateAuthPayload = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  await yup
    .object()
    .shape({
      document: yup.string().length(11).required(),
      password: yup.string().min(6).required(),
    })
    .validateSync(req.body, { abortEarly: false });

  next();
};
