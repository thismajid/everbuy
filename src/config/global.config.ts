import { config } from 'dotenv';

config();
export const { APP_PORT, NODE_ENV, DEFAULT_OTP } = process.env;
