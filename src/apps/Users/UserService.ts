import { CustomError } from 'express-handler-errors';
import { ObjectId } from 'bson';
import { MongoRepository } from 'typeorm';

import { connection } from '../../helper/getConnection';
import { dbConnections, IUserRequest } from '@config/config';

import { ClientUser } from './users.entity';

enum ClientType {
  'p' = 'profissional',
  'c' = 'cliente',
}
class UserService {
  private readonly repository: MongoRepository<ClientUser>;

  constructor() {
    this.repository = connection(ClientUser, dbConnections.mongo.name);
  }

  async create(user: ClientUser): Promise<ClientUser> {
    try {
      user.userType = ClientType[user.userType];

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

  async findOne(id: string): Promise<ClientUser> {
    const user = await this.repository.findOne({_id: ObjectId(id)});
    if (!user)
      throw new CustomError({
        code: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
        status: 404,
      });

    return user;
  }

  async update(userAuthenticated: IUserRequest, user: ClientUser): Promise<void> {
   
     var userModified = await this.repository.updateOne({
      _id: new ObjectId(userAuthenticated._id),
    },
    {$set:user}, );

    console.log(userModified)
    //return userModified;
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
