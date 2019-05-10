import { Module } from '@nestjs/common';
import { LoggerModule } from './modules/logger/logger.module';
import { HelloWorldModule } from './modules/helloworld/helloworld.module';
import { SwaggerExampleModule } from './modules/swagger-example/swagger-example.module';

@Module({
  imports: [LoggerModule, HelloWorldModule, SwaggerExampleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
