import { ClientUser } from '@apps/Users/users.entity';
import { auth, dbConnections } from '@config/config';
import logger from '@middlewares/logger';
import { CustomError } from 'express-handler-errors';
import { sign } from 'jsonwebtoken';
import { getConnection, MongoRepository } from 'typeorm';

class AuthService {
  private readonly repository: MongoRepository<ClientUser>;

  constructor() {
    this.repository = getConnection(
      dbConnections.mongo.name
    ).getMongoRepository(ClientUser);
  }

  async auth(data: {
    email: string;
    password: string;
  }): Promise<{ token: string; name: string; email: string }> {
    try {
      const { email, password } = data;
      logger.info(`AuthService::auth::`, data);

      const userFounded = await this.repository.findOne({ email, password });

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
          email: userFounded.email,
          name: userFounded.name,
        },
        auth.secret,
        {
          expiresIn: auth.expires,
        }
      );

      return { token: token, name: userFounded.name, email: userFounded.email };
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
