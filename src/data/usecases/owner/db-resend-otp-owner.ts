import { GenerateOTP } from '../../../apresentation/protocols/otp'
import { globalConfig } from '../../../config/value'
import { ResendOtpOwner, SendOtpType } from '../../../domain/usecases/owner-usecases/resend-otp-owner-usecase'
import { OwnerRepository } from '../../repositories/owner-repository'

export class DbResendOtpOwner implements ResendOtpOwner {
    constructor(
        private readonly getAccountOwnerByEmailRepository: OwnerRepository,
        private readonly generateOtp: GenerateOTP,
    ) {}

    async send(email: string): Promise<SendOtpType> {
        const account =
            await this.getAccountOwnerByEmailRepository.getAccountByEmail(email)

        if (!account) {
            return null
        }

        const otp = this.generateOtp.otp(account.secretKey, 6, 300)

        globalConfig.saveData = otp
        
        return {
            email : account.email
        }
    }
} 