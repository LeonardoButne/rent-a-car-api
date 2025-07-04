export interface VerifyOtpLoginForOwner {
    verify(otp: string, email: string, deviceId?: string): Promise<boolean | string>
} 