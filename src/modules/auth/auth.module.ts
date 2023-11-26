import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService, UsersService } from 'src/common/services';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
