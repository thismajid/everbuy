import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { REDIS_HOST, REDIS_PORT } from 'src/config/global.config';

@Module({
  imports: [
    AuthModule,
    CacheModule.register({
      host: REDIS_HOST,
      store: redisStore,
      port: REDIS_PORT,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
