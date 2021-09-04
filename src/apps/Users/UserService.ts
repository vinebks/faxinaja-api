import { CustomError } from 'express-handler-errors';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';

import { connection } from '../../helper/getConnection';
import { dbConnections, IUserRequest } from '@config/config';

import { ClientUser } from './users.entity';

class UserService {
  private readonly repository: MongoRepository<ClientUser>;

  constructor() {
    this.repository = connection(ClientUser, dbConnections.mongo.name);
  }

  async create(user: ClientUser): Promise<ClientUser> {
    try {
      const response = await this.repository.save(user);
      return response;
    } catch (e) {
      if (e.code === 11000)
        throw new CustomError({
          code: 'USER_ALREADY_EXISTS',
          message: 'Usuário já existente',
          status: 409,
        });
      throw e;
    }
  }

  async findAll(): Promise<ClientUser[]> {
    const user = await this.repository.find();
    if (!user)
      throw new CustomError({
        code: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
        status: 404,
      });

    return user;
  }

  async findOne(userAuthenticated: IUserRequest): Promise<ClientUser> {
    const user = await this.repository.findOne(userAuthenticated.document);
    if (!user)
      throw new CustomError({
        code: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
        status: 404,
      });

    return user;
  }

  async update(userAuthenticated: IUserRequest): Promise<ClientUser> {
    await this.repository.updateOne(
      {
        _id: new ObjectId(userAuthenticated.document),
      },
      {
        $set: {
          name: userAuthenticated.name,
        },
      }
    );

    return this.findOne(userAuthenticated);
  }

  async delete(userAuthenticated: IUserRequest): Promise<ClientUser> {
    const user = await this.findOne(userAuthenticated);
    await this.repository.deleteOne({
      _id: new ObjectId(userAuthenticated.document),
    });
    return user;
  }
}

export default new UserService();
