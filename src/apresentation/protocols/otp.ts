export interface GenerateOTP {
    otp(secret: string, digits: number, time: number): string
}

export interface VerifyOTP {
    isValid(secret: string, otp: string): boolean
}
