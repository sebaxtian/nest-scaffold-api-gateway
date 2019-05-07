import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  /**
   * CORS: https://github.com/expressjs/cors#configuration-options
   */
  const app = await NestFactory.create(AppModule, { cors: true });
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
  // Run app
  await app.listen(3000);
}
bootstrap();
