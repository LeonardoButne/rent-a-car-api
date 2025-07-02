import { VerifyOTP } from '../../../apresentation/protocols/otp'
import { Payload } from '../../../apresentation/protocols/payload'
import { PayloadUser } from '../../../apresentation/protocols/payloadUsers'
import { VerifyOtpLoginForOwner } from '../../../domain/usecases/owner-usecases/verify-otp-login-owner-usecase'
import { GenerateToken } from '../../protocols/cryptography/generate-token'
import { OwnerRepository } from '../../repositories/owner-repository'

export class DbVerifyOtpLoginOwner implements VerifyOtpLoginForOwner {
    constructor(
        private readonly getAccountOwnerByEmailRepository: OwnerRepository,
        private readonly verifyOtp: VerifyOTP,
        private readonly generateToken: GenerateToken,
    ) {}
    async verify(otp: string, email: string): Promise<string | boolean> {
        const account =
            await this.getAccountOwnerByEmailRepository.getAccountByEmail(email)

        if (!account) {
            return null
        }

        const validateOtp = this.verifyOtp.isValid(account.secretKey, otp)

        if (!validateOtp) {
            return false
        }

        const payload: PayloadUser = {
            iss: 'www.rentacar',
            aud: 'Rent a car',
            sub: account.id,
            statusAccount: account.statusAccount,
            isSuspended: account.isSuspended,
            email: account.email,
            typeAccount: 'owner',
        }

        return this.generateToken.token(payload)
    }
} 