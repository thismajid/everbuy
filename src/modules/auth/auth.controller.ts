import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService, UsersService } from 'src/common/services';
import { LoginAuthDto, VerifyLoginAuthDto } from 'src/common/types/login.type';

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

  @Post('/login/verify')
  @ApiBody({ type: VerifyLoginAuthDto })
  @ApiOkResponse({
    description: 'Verify login successfully',
  })
  async verifyLogin(@Body() body: VerifyLoginAuthDto) {
    let { input, otp } = body;
    input = await this.usersService.normalizeMobile({ mobile: input });

    await this.authService.checkOtpExist({ input });
    await this.authService.checkOtpVerify({ input, otp });
    await this.authService.verifyLogin({ input });
  }
}
