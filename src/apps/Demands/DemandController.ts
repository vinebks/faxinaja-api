import { Request, Response } from 'express';
import DemandService from './DemandService';

export const createDemand = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await DemandService.createDemand(req.body);
  return res.json(response);
};
