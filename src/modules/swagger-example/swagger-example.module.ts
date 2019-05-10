import { Module, HttpModule } from '@nestjs/common';
import { SwaggerExampleService } from './services/swagger-example.service';
import { SwaggerExampleController } from './swagger-example.controller';

@Module({
  imports: [HttpModule],
  providers: [SwaggerExampleService],
  controllers: [SwaggerExampleController],
})
export class SwaggerExampleModule {}
