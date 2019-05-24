import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { SwaggerExampleModule } from '../src/modules/swagger-example/swagger-example.module';

describe('SwaggerExampleController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SwaggerExampleModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/swagger-example/mensaje (GET)', () => {
    return request(app.getHttpServer())
      .get('/swagger-example/mensaje')
      .expect(200)
      .expect(`"Mensaje de Swagger Example !!"`);
  });

  afterAll(async () => {
    await app.close();
  });
});
