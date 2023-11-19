import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/common/services/auth/auth.service';
import { LoginAuthDto } from 'src/common/types/login.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: LoginAuthDto })
  @ApiOkResponse({
    description: 'Send otp code successfully',
  })
  async login(@Body() body: LoginAuthDto) {
    const otp = this.authService.generateOtp(4);
  }
}
