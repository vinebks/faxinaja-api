import { Request, Response } from 'express';

import AmUserService from './AmUsersService';

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await AmUserService.create(req.body);
  return res.json(response);
};

export const findAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { setor } = req.params;
  const response = await AmUserService.findAll(String(setor));
  return res.json(response);
};

export const findOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { idUser } = req.params;
  const response = await AmUserService.findOne(String(idUser));
  return res.json(response);
};

// export const update = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const response = await UserService.update(req.user);
//   return res.json(response);
// };

// export const deleteOne = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const response = await UserService.delete(req.user);
//   return res.json(response);
// };
