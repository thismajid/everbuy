import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { REDIS_HOST, REDIS_PORT } from 'src/config/global.config';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { CategoryService } from 'src/common/services';
import { TagsModule } from './tags/tags.module';
import { ProductsModule } from './products/products.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    CacheModule.register({
      host: REDIS_HOST,
      store: redisStore,
      port: REDIS_PORT,
      isGlobal: true,
    }),
    TagsModule,
    ProductsModule,
    CommentsModule,
  ],
  controllers: [CategoryController, AppController],
  providers: [AppService, PrismaService, CategoryService],
})
export class AppModule {}
