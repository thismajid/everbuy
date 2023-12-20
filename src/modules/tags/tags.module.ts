import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagsService } from 'src/common/services';

@Module({
  controllers: [TagsController],
  providers: [TagsService, PrismaService],
})
export class TagsModule {}
