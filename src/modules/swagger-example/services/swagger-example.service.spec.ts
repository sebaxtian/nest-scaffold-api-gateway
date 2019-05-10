import { Test, TestingModule } from '@nestjs/testing';
import { SwaggerExampleService } from './swagger-example.service';

describe('SwaggerExampleService', () => {
  let service: SwaggerExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwaggerExampleService],
    }).compile();

    service = module.get<SwaggerExampleService>(SwaggerExampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
