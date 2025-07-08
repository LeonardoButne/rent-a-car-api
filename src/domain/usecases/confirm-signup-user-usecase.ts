export type ConfirmSignupUserInput = {
  email: string;
  otp: string;
  deviceId?: string;
};

export interface ConfirmSignupUserUsecase {
  confirm(data: ConfirmSignupUserInput): Promise<{ token?: string; typesActivated: string[] } | Error>;
} 