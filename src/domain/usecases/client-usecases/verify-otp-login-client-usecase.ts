export interface VerifyOtpLoginForClient {
    verify(otp: string, email: string, deviceId?: string): Promise<boolean | string>
}
