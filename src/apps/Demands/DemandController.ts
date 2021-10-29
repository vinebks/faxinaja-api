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
  console.log(clientId);
  const response = await DemandService.listMyDemands(clientId);
  console.log(response);
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
  const response = await DemandService.listOpenDemands(req.user._id);
  return res.json(response);
};

export const assignDemandToProfessional = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientId = req.user._id;
  const demandId = req.params.demandId;
  const response = await DemandService.assignDemandToProfessional(
    clientId,
    demandId
  );

  return res.json(response);
};

export const finishOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientId = req.user._id;
  const demandId = req.params.demandId;
  const response = await DemandService.finishOrder(clientId, demandId);

  return res.json(response);
};

export const findMyMadeDemands = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const professionalId = req.user._id;
  const response = await DemandService.findMyMadeDemands(professionalId);

  return res.json(response);
};
