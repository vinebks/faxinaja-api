import { dbConnections } from '@config/config';
import { connection } from '@helper/getConnection';
import { ObjectId } from 'bson';
import { CustomError } from 'express-handler-errors';
import { MongoRepository } from 'typeorm';
import { Demands } from './demand.entity';

enum Services {
  limpezaGeral = 120,
}
class DemandService {
  private readonly repository: MongoRepository<Demands>;

  constructor() {
    this.repository = connection(Demands, dbConnections.mongo.name);
  }

  async createDemand(demandData: Demands, clientId: string): Promise<Demands> {
    try {
      const demand = {
        status: 'aberto',
        extraServices: demandData.extraServices ? demandData.extraServices : [],
        clientId: clientId,
        professionalId: '',
        serviceDate: new Date(demandData.serviceDate),
        serviceType: demandData.serviceType,
        serviceValue: Services[demandData.serviceType],
        address: demandData.address,
      };

      const response = this.repository.save(demand);
      return response;
    } catch (err: any) {
      if (err instanceof CustomError) throw err;

      throw new CustomError({
        code: 'SERVICE_UNAVAILABLE',
        message: 'Nao foi possivel criar um servico',
        status: 500,
      });
    }
  }

  async listMyDemands(clientId: string): Promise<Demands[]> {
    try {
      const demandsList = await this.repository.find({ clientId: clientId });

      return demandsList;
    } catch (err: any) {}

    return [];
  }

  async deleteMyDemands(clientId: string): Promise<Demands[]> {
    try {
       await this.repository.delete({ clientId: clientId });

    } catch (err: any) {}

    return [];
  }
  async listOpenDemands(): Promise<Demands[]> {
    try {
      const demandsList = await this.repository.find({ professionalId: ""});

      return demandsList;
    } catch (err: any) {}

    return [];
  }

  async assignDemandToProfessional(clientId: string, demandId: string): Promise<void> {
    try {
      console.log("clientId "+ clientId)
      console.log("demandId "+ demandId)
      const demandsList = await this.repository.findOneAndUpdate()
      //return demandsList;
    } catch (err: any) {}

    //return [];
  }
}

export default new DemandService();
