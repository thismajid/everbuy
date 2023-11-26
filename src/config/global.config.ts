import { config } from 'dotenv';

config();
export const {
  APP_PORT,
  NODE_ENV,
  DEVELOPMENT_LOGIN_OTP,
  SMS_API_KEY,
  SMS_TEMPLATE,
  REDIS_HOST,
  REDIS_PORT,
} = process.env;

export const LOGIN_RETRIES_ALLOWED = Number(process.env.LOGIN_RETRIES_ALLOWED);
export const LOGIN_OTP_TTL = Number(process.env.LOGIN_OTP_TTL);
export const REDIS_LOGIN_KEY = 'otpMobie::';
