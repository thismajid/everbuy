export interface IOtpData {
  otp?: string | number;
  type?: string;
  retriesSendOtp?: number;
  retriesWrongOtp?: number;
  isVerify?: boolean;
}
