export type ResendOtpUserInput = {
  email: string;
};

export interface ResendOtpUserUsecase {
  resend(data: ResendOtpUserInput): Promise<boolean>;
} 