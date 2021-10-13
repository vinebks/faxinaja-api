import { Request, Response } from 'express';
import DemandService from './DemandService';

export const createDemand = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientId = req.user._id;
  const response = await DemandService.createDemand(req.body, clientId);
  return res.json(response);
};

export const findMyDemands = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientId = req.user._id;
  const response = await DemandService.listMyDemands(clientId);
  return res.json(response);
};

export const deleteDemands = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientId = req.user._id;
  const response = await DemandService.deleteMyDemands(clientId);
  return res.json(response);
};
export const findOpenDemands = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await DemandService.listOpenDemands()
  return res.json(response);
};

export const assignDemandToProfessional = async (
  req: Request,
  res: Response
): Promise<Response> => {

  const clientId = req.user._id;
  const demandId = req.params.demandId
  const response = await DemandService.assignDemandToProfessional(clientId,demandId );
  
  return res.json(response);
};
