import yup from '@config/yup';
import { NextFunction, Request, Response } from 'express';

export const validateAuthPayload = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  yup
    .object()
    .shape({
      email: yup.string().required(),
      password: yup.string().min(6).required(),
    })
    .validateSync(req.body, { abortEarly: false });

  next();
};
