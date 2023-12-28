import { Module, OnModuleInit } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import {
  ADMIN_EMAIL,
  ADMIN_MOBILE,
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
  REDIS_HOST,
  REDIS_PORT,
} from 'src/config/global.config';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { CategoryService } from 'src/common/services';
import { TagsModule } from './tags/tags.module';
import { ProductsModule } from './products/products.module';
import { CommentsModule } from './comments/comments.module';
import { AdminsService } from 'src/common/services/admins.service';
import { CartModule } from './cart/cart.module';

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
    CartModule,
  ],
  controllers: [CategoryController, AppController],
  providers: [AppService, PrismaService, CategoryService, AdminsService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly adminsService: AdminsService) {}

  async onModuleInit() {
    await this.adminsService.createSuperAdmin({
      email: ADMIN_EMAIL,
      mobile: ADMIN_MOBILE,
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });
  }
}
