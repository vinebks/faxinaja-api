import { CustomError } from 'express-handler-errors';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';

import { connection } from '../../helper/getConnection';
import { dbConnections, IUserRequest } from '@config/config';

import { AmUsers } from './AmUsers.entity';

enum ClientType {
  'p' = 'profissional',
  'c' = 'cliente',
}

class AmUserService {
  private readonly repository: MongoRepository<AmUsers>;

  constructor() {
    this.repository = connection(AmUsers, dbConnections.mongo.name);
  }

  async create(user: AmUsers): Promise<AmUsers> {
    try {
      const response = await this.repository.save(user);
      return response;
    } catch (e: any) {
      if (e.code === 11000)
        throw new CustomError({
          code: 'USER_ALREADY_EXISTS',
          message: 'Usuário já existente',
          status: 409,
        });
      throw e;
    }
  }

  async findAll(setor: string): Promise<{ budget: number; users: AmUsers[] }> {
    console.log('logando Setor', setor);
    const user = await this.repository.find({ siglaSetor: setor });
    if (!user)
      throw new CustomError({
        code: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
        status: 404,
      });

    let budget = 0;

    user.map((user) => {
      budget += Number(user.Salary);
    });

    return { budget, users: user };
  }

  async findOne(userId: string): Promise<AmUsers> {
    const user = await this.repository.findOne({ userId: userId });
    if (!user)
      throw new CustomError({
        code: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
        status: 404,
      });

    return user;
  }

  // async update(userAuthenticated: IUserRequest): Promise<ClientUser> {
  //   await this.repository.updateOne(
  //     {
  //       _id: new ObjectId(userAuthenticated.document),
  //     },
  //     {
  //       $set: {
  //         name: userAuthenticated.name,
  //       },
  //     }
  //   );

  //   return this.findOne(userAuthenticated);
  // }
}

export default new AmUserService();
