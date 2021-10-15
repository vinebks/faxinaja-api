import { ObjectID } from 'bson';
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
  const { userId } = req.params;
  const response = await AmUserService.findOne(String(userId));
  return res.json(response);
};

export const updateSalary = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;
  const { newSalary, document } = req.body;
  const response = await AmUserService.updateSalary(
    String(userId),
    Number(newSalary),
    String(document)
  );
  return res.json(response);
};

export const createNewComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;
  const { newComment } = req.body;
  const response = await AmUserService.createComment(
    String(userId),
    String(newComment)
  );
  return res.json(response);
};

export const updateAllSalarys = async (
  _: Request,
  res: Response
): Promise<Response> => {
  const response = await AmUserService.updateAllSalarysToNumber();
  return res.json(response);
};

export const getBalance = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { document } = req.params;
  const response = await AmUserService.getBalance(document);
  return res.json(response);
};

// export const deleteOne = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const response = await UserService.delete(req.user);
//   return res.json(response);
// };
