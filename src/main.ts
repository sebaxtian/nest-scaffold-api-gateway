import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { MyLogger } from './modules/logger/my-logger.service';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  /**
   * CORS: https://github.com/expressjs/cors#configuration-options
   */
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: false,
  });
  /**
   * Logger: https://docs.nestjs.com/v5/techniques/logger
   */
  app.useLogger(app.get(MyLogger));
  /**
   * Security: https://docs.nestjs.com/v5/techniques/security
   */
  app.use(helmet());
  /**
   * CSRF: https://docs.nestjs.com/v5/techniques/security
   */
  // app.use(csurf());
  /**
   * To protect from brute-force attacks: https://docs.nestjs.com/v5/techniques/security
   */
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  /**
   * Validation: https://docs.nestjs.com/v5/techniques/validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
      // whitelist: true,
      // transform: true,
    }),
  );
  /**
   * Swagger Config: https://docs.nestjs.com/v5/recipes/swagger
   */
  const options = new DocumentBuilder()
    .setTitle('NestJS Scaffold API Gateway')
    .setDescription('Configuración de scaffold para crear API Gateway usando el Framework NestJS')
    .setVersion('1.0.0')
    .addTag('helloworld')
    .addTag('swagger-example')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  // Run app
  await app.listen(3000);
}
bootstrap();
