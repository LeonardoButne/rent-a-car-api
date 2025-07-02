export interface VerifyOtpLoginForClient {
    verify(otp: string, email: string): Promise<boolean | string>
}
