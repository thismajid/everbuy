import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from 'src/common/services';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService],
})
export class CommentsModule {}
