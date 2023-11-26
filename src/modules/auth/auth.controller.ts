import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService, UsersService } from 'src/common/services';
import { LoginAuthDto } from 'src/common/types/login.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/login')
  @ApiBody({ type: LoginAuthDto })
  @ApiOkResponse({
    description: 'Send otp code successfully',
  })
  async login(@Body() body: LoginAuthDto) {
    let { input } = body;
    input = await this.usersService.normalizeMobile({ mobile: input });

    await this.authService.checkRetriesSendOtp({ input });
    await this.authService.sendOtp({ input });
  }
}
