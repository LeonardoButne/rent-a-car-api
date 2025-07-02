export interface VerifyOtpLoginForOwner {
    verify(otp: string, email: string): Promise<boolean | string>
} 