export interface VerifyOtpLoginForAdministrator {
    verify(otp: string, email: string): Promise<boolean | string>
} 