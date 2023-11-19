import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app.module';
import { APP_PORT } from './config/global.config';
import { logger } from './common/utils/logger';
import SwaggerConfig from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  SwaggerConfig(app);
  await app.listen(APP_PORT, () => {
    logger.log(`App started on PORT ${APP_PORT} ... 🚀🔥`);
  });
}
bootstrap();
