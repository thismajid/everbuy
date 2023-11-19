import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { APP_PORT } from './config/global.config';
import { logger } from './common/utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(APP_PORT, () => {
    logger.log(`App started on PORT ${APP_PORT} ... 🚀🔥`);
  });
}
bootstrap();
