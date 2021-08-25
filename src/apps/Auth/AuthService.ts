import { Users } from '@apps/Users/users.entity';
import { auth, dbConnections } from '@config/config';
import logger from '@middlewares/logger';
import { CustomError } from 'express-handler-errors';
import { sign } from 'jsonwebtoken';
import { getConnection, MongoRepository } from 'typeorm';

class AuthService {
  private readonly repository: MongoRepository<Users>;

  constructor() {
    this.repository = getConnection(
      dbConnections.mongo.name
    ).getMongoRepository(Users);
  }

  async auth(data: {
    document: string;
    password: string;
  }): Promise<{ token: string }> {
    try {
      const { document, password } = data;
      logger.info(`AuthService::auth::`, data);

      const userFounded = await this.repository.findOne({ document, password });

      if (!userFounded) {
        throw new CustomError({
          code: 'USER_NOT_FOUND',
          message: 'Usuario informado nao encontrado',
          status: 404,
        });
      }

      const token = await sign(
        {
          _id: userFounded._id,
          document: userFounded.document,
          name: userFounded.name,
        },
        auth.secret,
        {
          expiresIn: auth.expires,
        }
      );

      return { token };
    } catch (err) {
      if (err instanceof CustomError) throw err;
      logger.error(`AuthService::auth::${err.message}`);

      throw new CustomError({
        code: 'ERROR_AUTHENTICATE',
        message: 'Erro ao autenticar',
        status: 500,
      });
    }
  }
}

export default new AuthService();
