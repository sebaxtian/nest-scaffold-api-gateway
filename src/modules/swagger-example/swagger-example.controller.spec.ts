import { Test, TestingModule } from '@nestjs/testing';
import { SwaggerExampleController } from './swagger-example.controller';

describe('SwaggerExample Controller', () => {
  let controller: SwaggerExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwaggerExampleController],
    }).compile();

    controller = module.get<SwaggerExampleController>(SwaggerExampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
