import { server } from '@config/config';
import connection from '@config/db';

import logger from '@middlewares/logger';
import 'reflect-metadata';

connection.then(() => {
  logger.info(`Database connected`);

  require('./app').default.app.listen(server.port, () => {
    logger.info('Server running', { port: server.port, mode: server.env });
  });
});
