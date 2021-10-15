import { CustomError } from 'express-handler-errors';
import { ObjectID, ObjectId } from 'bson';
import { MongoRepository } from 'typeorm';

import { connection } from '../../helper/getConnection';
import { dbConnections, IUserRequest } from '@config/config';

import { AmUsers } from './AmUsers.entity';
import { ClientUser } from '../Users/users.entity';

enum ClientType {
  'p' = 'profissional',
  'c' = 'cliente',
}

class AmUserService {
  private readonly repository: MongoRepository<AmUsers>;
  private readonly ClientRepository: MongoRepository<ClientUser>;

  constructor() {
    this.repository = connection(AmUsers, dbConnections.mongo.name);
    this.ClientRepository = connection(ClientUser, dbConnections.mongo.name);
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

  async updateSalary(
    userId: string,
    newSalary: number,
    document: string
  ): Promise<any> {
    const findGestor = await this.ClientRepository.findOne({
      document: document,
    });

    if (!findGestor) {
      throw new CustomError({
        code: 'USER_NOT_FOUND',
        message: 'Usuário Gestor não encontrado',
        status: 404,
      });
    }

    const newBudget = findGestor.balance - newSalary;

    const findEmployee = await this.repository.findOne({ userId: userId });

    if (!findEmployee) {
      throw new CustomError({
        code: 'USER_NOT_FOUND',
        message: 'Usuário Employee não encontrado',
        status: 404,
      });
    }

    const newAmount = findEmployee.Salary + newSalary;

    this.ClientRepository.findOneAndUpdate(
      { _id: findGestor._id },
      { $set: { balance: newBudget } }
    );

    const user = await this.repository.findOneAndUpdate(
      { userId: findEmployee.userId },
      { $set: { Salary: newAmount } }
    );
    if (!user)
      throw new CustomError({
        code: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
        status: 404,
      });

    return user;
  }

  async createComment(userId: string, newComment: string): Promise<any> {
    // const userExists = await this.repository.findOne({ userId: userId });

    // if (!userExists)
    //   throw new CustomError({
    //     code: 'USER_NOT_FOUND',
    //     message: 'Usuário não encontrado',
    //     status: 404,
    //   });

    const user = await this.repository.findOneAndUpdate(
      { userId: userId },
      { $push: { comments: newComment } }
    );
    if (!user)
      throw new CustomError({
        code: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
        status: 404,
      });

    return user;
  }

  async updateAllSalarysToNumber(): Promise<any> {
    const users = await this.repository.find();

    users.map(async (user) => {
      await this.repository.findOneAndUpdate(
        { userId: user.userId },
        { $set: { Salary: Number(user.Salary) } }
      );
    });

    return 'Ok';
  }

  async getBalance(document: string): Promise<number> {
    const gestor = await this.ClientRepository.findOne({ document: document });

    if (!gestor)
      throw new CustomError({
        code: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
        status: 404,
      });

    return gestor.balance;
  }
}

export default new AmUserService();
