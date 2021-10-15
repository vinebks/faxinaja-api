import { Request, Response } from 'express';
import AuthService from './AuthService';

export const auth = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
  const response = await AuthService.auth({ email, password });

  return res.json(response);
};
