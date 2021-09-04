import { auth } from '@config/config';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from 'express-handler-errors';
import { verify } from 'jsonwebtoken';
import logger from './logger';

export const authorize = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization;

  logger.info(`Authorize::validate token::${token}`);

  if (!token) {
    return next(
      new CustomError({
        code: 'UNAUTHORIZED',
        message: 'Token não enviado',
        status: 401,
      })
    );
  }

  try {
    const decoded = verify(token, auth.secret) as any;

    req.user = decoded;
    logger.info(`Authorize::user authorized::`);

    next();
  } catch (err) {
    logger.error(`Authorize::error decode token::${err.message}`);
    return next(
      new CustomError({
        code: 'UNAUTHORIZED',
        message: 'Token inválido',
        status: 401,
      })
    );
  }
};
