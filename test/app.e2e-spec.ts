import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const login = `
  mutation {
    login(input: { email: "hehe1@gmail.com", password: "hehe"})
  }
  `;
  it('/ (login)', () => { 
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: login,
      })
      .expect(({ body }) => {
        expect(body.data.login).toBeDefined();
      })
      .expect(200);
  });
});
