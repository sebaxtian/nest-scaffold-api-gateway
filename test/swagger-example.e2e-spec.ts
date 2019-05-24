import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { SwaggerExampleModule } from '../src/modules/swagger-example/swagger-example.module';

describe('SwaggerExampleController (e2e)', () => {
  let app;
  let idSwaggerExample;

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

  it('/swagger-example (POST)', (done) => {
    return request(app.getHttpServer())
      .post('/swagger-example')
      .send({userGithub: 'sebaxtian'})
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { return done(err); }
        // console.log('/swagger-example POST: ', res.body);
        idSwaggerExample = res.body.id;
        return done();
      });
  });

  it('/swagger-example (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/swagger-example')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { return done(err); }
        // console.log('/swagger-example GET: ', res.body);
        return done();
      });
  });

  it('/swagger-example/{id} (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/swagger-example/' + idSwaggerExample)
      .expect(302)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { return done(err); }
        // console.log('/swagger-example/{id} GET: ', res.body);
        return done();
      });
  });

  it('/swagger-example/{id} (PUT)', (done) => {
    return request(app.getHttpServer())
      .put('/swagger-example/' + idSwaggerExample)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { return done(err); }
        // console.log('/swagger-example/{id} GET: ', res.body);
        return done();
      });
  });

  it('/swagger-example/{id} (DELETE)', (done) => {
    return request(app.getHttpServer())
      .delete('/swagger-example/' + idSwaggerExample)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { return done(err); }
        // console.log('/swagger-example/{id} GET: ', res.body);
        return done();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
