import { dbConnections } from '@config/config';
import { connection } from '@helper/getConnection';
import { CustomError } from 'express-handler-errors';
import { MongoRepository } from 'typeorm';
import { Demands } from './demand.entity';

class DemandService {
  private readonly repository: MongoRepository<Demands>;

  constructor() {
    this.repository = connection(Demands, dbConnections.mongo.name);
  }

  async createDemand(demandData: Demands): Promise<Demands> {
    try {
      const response = this.repository.save(demandData);
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
}

export default new DemandService();
