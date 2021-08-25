import { CustomError } from 'express-handler-errors';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';

import { connection } from '../../helper/getConnection';
import { dbConnections, IUserRequest } from '@config/config';

import { Users } from './users.entity';

class UserService {
  private readonly repository: MongoRepository<Users>;

  constructor() {
    this.repository = connection(Users, dbConnections.mongo.name);
  }

  async create(user: Users): Promise<Users> {
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

  async findAll(): Promise<Users[]> {
    const user = await this.repository.find();
    if (!user)
      throw new CustomError({
        code: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
        status: 404,
      });

    return user;
  }

  async findOne(userAuthenticated: IUserRequest): Promise<Users> {
    const user = await this.repository.findOne(userAuthenticated._id);
    if (!user)
      throw new CustomError({
        code: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
        status: 404,
      });

    return user;
  }

  async update(userAuthenticated: IUserRequest): Promise<Users> {
    await this.repository.updateOne(
      {
        _id: new ObjectId(userAuthenticated._id),
      },
      {
        $set: {
          name: userAuthenticated.name,
        },
      }
    );

    return this.findOne(userAuthenticated);
  }

  async delete(userAuthenticated: IUserRequest): Promise<Users> {
    const user = await this.findOne(userAuthenticated);
    await this.repository.deleteOne({
      _id: new ObjectId(userAuthenticated._id),
    });
    return user;
  }
}

export default new UserService();
