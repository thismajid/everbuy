import { config } from 'dotenv';

config();
export const { APP_PORT, NODE_ENV, DEVELOPMENT_LOGIN_OTP } = process.env;
