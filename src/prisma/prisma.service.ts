import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { logger } from 'src/common/utils';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    logger.debug(`Database connected successfully ... 🔥`);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    logger.debug(`Database disconnected ...`);
  }
}
