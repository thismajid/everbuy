import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ILoginResponse } from 'src/common/interfaces';
import { AuthService, UsersService } from 'src/common/services';
import { LoginAuthDto, VerifyLoginAuthDto } from 'src/common/types';

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
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginAuthDto): Promise<void> {
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
  @HttpCode(HttpStatus.OK)
  async verifyLogin(@Body() body: VerifyLoginAuthDto): Promise<ILoginResponse> {
    let { input, otp } = body;
    input = await this.usersService.normalizeMobile({ mobile: input });

    await this.authService.checkOtpExist({ input });
    await this.authService.checkOtpVerify({ input, otp });
    await this.authService.verifyLogin({ input });

    let user = await this.usersService.findByMobile({
      mobile: input,
    });
    const isNewUser = !user;

    if (!user) {
      user = await this.usersService.createNewUser({
        mobile: input,
      });
    }

    const { accessToken } = await this.authService.createAuthToken({
      userId: user.id,
    });

    return { accessToken, isNewUser, user };
  }
}
