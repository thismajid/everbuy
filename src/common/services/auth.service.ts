import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';
import {
  DEVELOPMENT_LOGIN_OTP,
  LOGIN_OTP_TTL,
  LOGIN_RETRIES_ALLOWED,
  NODE_ENV,
  REDIS_LOGIN_KEY,
  SMS_API_KEY,
  SMS_TEMPLATE,
} from 'src/config/global.config';
import { errorMessages } from 'src/config/errorMessages.config';
import { IOtpData } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async checkRetriesSendOtp({ input }): Promise<void> {
    const otpData: IOtpData = await this.cacheService.get(
      `${REDIS_LOGIN_KEY}${input}`,
    );

    if (otpData) {
      if (otpData.retriesSendOtp < LOGIN_RETRIES_ALLOWED) {
        otpData.retriesSendOtp += 1;
        await this.cacheService.set(input, otpData, LOGIN_OTP_TTL);
      } else {
        throw new BadRequestException(
          errorMessages.CLIENT.AUTH.LOGIN.MAX_RETRIES_ALLOWED,
        );
      }
    }
  }

  async sendOtp({ input }): Promise<void> {
    let otpData: IOtpData = await this.cacheService.get(
      `${REDIS_LOGIN_KEY}${input}`,
    );

    const loginOtp = this.generateOtp();

    if (!otpData) {
      otpData = {
        retriesSendOtp: 1,
        otp: loginOtp,
      };
    } else {
      otpData.otp = loginOtp;
    }

    await this.cacheService.set(
      `${REDIS_LOGIN_KEY}${input}`,
      otpData,
      500 * 60 * 10, // 5 minutes
    );

    await this.sendOtpSms({ mobile: input, otp: otpData.otp });
  }

  generateOtp(length: number = 4): string {
    let otp = '';
    if (NODE_ENV !== 'production') {
      otp = DEVELOPMENT_LOGIN_OTP ?? '7777';
    } else {
      for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10);
      }
    }

    return otp;
  }

  async sendOtpSms({ mobile, otp }): Promise<void> {
    if (NODE_ENV === 'production') {
      await axios.post(
        `https://api.kavenegar.com/v1/${SMS_API_KEY}/verify/lookup.json`,
        {
          receptor: mobile,
          template: SMS_TEMPLATE,
          token: otp,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
    }
  }
}
