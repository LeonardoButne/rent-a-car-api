import { VerifyOTP } from '../../apresentation/protocols//otp'
import speakeasy from 'speakeasy'

export class VerifyOtpAdapter implements VerifyOTP {
    isValid(secret: string, token: string): boolean {
        return speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token,
            step: 300,
            window: 3,
        })
    }
}