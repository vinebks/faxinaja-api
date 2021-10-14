import { Request, Response } from 'express';

import UserService from './UserService';

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await UserService.create(req.body);
  return res.json(response);
};

export const findAll = async (_: Request, res: Response): Promise<Response> => {
  const response = await UserService.findAll();
  return res.json(response);
};

export const findOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {_id} = req.user;
  const response = await UserService.findOne(_id);
  return res.json(response);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await UserService.update(req.user);
  return res.json(response);
};

export const deleteOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await UserService.delete(req.user);
  return res.json(response);
};
