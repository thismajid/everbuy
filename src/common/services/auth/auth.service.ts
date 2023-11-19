import { BadRequestException, Injectable } from '@nestjs/common';
import { DEFAULT_OTP, NODE_ENV } from 'src/config/global.config';

@Injectable()
export class AuthService {
  generateOtp(length: number = 4): string {
    let otp = '';
    if (NODE_ENV !== 'production') {
      otp = DEFAULT_OTP ?? '7777';
    } else {
      for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10);
      }
    }

    return otp;
  }
}
