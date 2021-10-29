import { ClientUser } from '@apps/Users/users.entity';
import { dbConnections } from '@config/config';
import { connection } from '@helper/getConnection';
import { ObjectId } from 'bson';
import { CustomError } from 'express-handler-errors';
import { MongoRepository } from 'typeorm';
import { Demands } from './demand.entity';

enum Services {
  limpezaGeral = 120,
  limpezaSimples = 80,
  limpezaPequena = 100,
  areaExterna = 100,
}
class DemandService {
  private readonly repository: MongoRepository<Demands>;
  private readonly userRepository: MongoRepository<ClientUser>;

  constructor() {
    this.repository = connection(Demands, dbConnections.mongo.name);
    this.userRepository = connection(ClientUser, dbConnections.mongo.name);
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
      const demandsList = await this.repository.find({
        clientId: clientId,
      });

      const listaOrdenada = demandsList.sort((a, b) => {
        return a.serviceDate > b.serviceDate ? -1 : 1;
      });

      return listaOrdenada;
    } catch (err: any) {}

    return [];
  }

  async deleteMyDemands(clientId: string): Promise<Demands[]> {
    try {
      await this.repository.delete({ clientId: clientId });
    } catch (err: any) {}

    return [];
  }

  async listOpenDemands(_id: string): Promise<Demands[]> {
    try {
      const professionalInfos = await this.userRepository.findOne(_id);

      if (!professionalInfos) {
        throw new CustomError({
          code: 'USER_NOT_FOUND',
          message: 'Nao foi possivel encontrar o usuario',
          status: 404,
        });
      }

      const demandsList = await this.repository.find({
        professionalId: '',
        status: 'aberto',
        'address.city': { $eq: professionalInfos.address.city },
      });

      return demandsList;
    } catch (err: any) {}

    return [];
  }

  async assignDemandToProfessional(
    clientId: string,
    demandId: string
  ): Promise<void> {
    try {
      console.log('clientId ' + clientId);
      console.log('demandId ' + demandId);
      const ret = await this.repository.findOneAndUpdate(
        { _id: ObjectId(demandId) },
        { $set: { professionalId: clientId, status: 'agendado' } }
      );
      console.log(ret);
    } catch (err: any) {
      console.error(err);
    }

    //return [];
  }

  async findMyMadeDemands(professionalId: string): Promise<Demands[]> {
    try {
      console.log(professionalId);
      const demandsList = await this.repository.find({
        professionalId: professionalId,
      });

      console.log('Ret ' + demandsList);
      return demandsList;
    } catch (err: any) {
      console.error(err);
    }

    return [];
  }

  async finishOrder(clientId: string, demandId: string): Promise<void> {
    try {
      console.log('clientId ' + clientId);
      console.log('demandId ' + demandId);
      const ret = await this.repository.findOneAndUpdate(
        { _id: ObjectId(demandId) },
        { $set: { status: 'finalizado' } }
      );
      console.log(ret);
    } catch (err: any) {
      console.error(err);
    }

    //return [];
  }
}

export default new DemandService();
