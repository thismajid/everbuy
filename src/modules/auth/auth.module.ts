import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService, UsersService } from 'src/common/services';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { JWT_ACCESS_EXPIRATION_MINUTES, JWT_SECRET } from 'src/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_ACCESS_EXPIRATION_MINUTES },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtService,
    JwtStrategy,
    PrismaService,
  ],
  exports: [JwtService, JwtModule, PassportModule],
})
export class AuthModule {}
