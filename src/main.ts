import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app.module';
import { APP_PORT } from './config/global.config';
import SwaggerConfig from './config/swagger.config';
import { logger } from './common/utils';
import { ResponseInterceptor } from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableShutdownHooks();
  SwaggerConfig(app);
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(APP_PORT, () => {
    logger.debug(`App started on PORT ${APP_PORT} ... 🚀`);
  });
}
bootstrap();
