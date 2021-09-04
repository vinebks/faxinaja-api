import { MongoRepository, getConnection } from 'typeorm';

export function connection<T>(
  Type: { new (): T },
  connectionName: string
): MongoRepository<T> {
  return getConnection(connectionName).getMongoRepository(Type);
}
