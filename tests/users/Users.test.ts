import { MockProxy } from 'jest-mock-extended';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { MongoRepository } from 'typeorm';

jest.mock('../../src/middlewares/logger');
jest.mock('typeorm');
describe('User Module tests', () => {
  const { app } = require('../../src/app').default;
  const repository = require('typeorm').mongoRepositoryMock as MockProxy<
    MongoRepository<any>
  >;
  test('Return all users with success', async () => {
    const user = [
      {
        _id: '6001abf43d4675bc1aa693bc',
        name: 'Teste',
        password: '1234',
      },
    ];

    repository.find.mockResolvedValue(user as any);

    const spy = jest.spyOn(jwt, 'verify');
    spy.mockReturnValue({
      _id: '6064b5560e12df0b9eccbcee',
      document: '42780908890',
      name: 'Vitor',
    } as any);

    await request(app)
      .get(`/faxinaja-api/users`)
      .set('Authorization', 'token')
      .expect(200, user);
  });
});
