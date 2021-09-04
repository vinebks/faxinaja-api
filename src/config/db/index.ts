import { resolve } from 'path';
import { createConnections } from 'typeorm';

import { dbConnections, server } from '../config';

const connection = createConnections([
  {
    name: dbConnections.mongo.name,
    type: 'mongodb',
    url: dbConnections.mongo.conn,
    entities: [resolve(__dirname, '../../apps/**/*.entity{.ts,.js}')],
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: server.env === 'dev', // Se o ambiente for dev, o typeorm se incarrega de gerar e alterar as tabelas
  },
]);

export default connection;
