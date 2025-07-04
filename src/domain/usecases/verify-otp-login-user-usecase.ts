export type VerifyOtpLoginUserInput = {
  email: string;
  otp: string;
  deviceId?: string;
};

export interface VerifyOtpLoginUserUsecase {
  verify(data: VerifyOtpLoginUserInput): Promise<string | boolean>;
} 