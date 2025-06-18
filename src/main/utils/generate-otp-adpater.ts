import { GenerateOTP } from '../../apresentation/protocols/otp'
import speakeasy from 'speakeasy'

export class GenerateOtpAdapter implements GenerateOTP {
    otp(secret: string, digits: number, time: number): string {
        return speakeasy.totp({
            secret,
            encoding: 'base32',
            digits,
            step: time,
        })
    }
}
