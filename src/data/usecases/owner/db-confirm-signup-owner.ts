import { VerifyOTP } from '../../../apresentation/protocols/otp'
import { VerifyOtpSignupOwner } from '../../../domain/usecases/owner-usecases/confirm-signup-owner-usecase'
import { OwnerRepository } from '../../repositories/owner-repository'
import { GenerateToken } from '../../protocols/cryptography/generate-token'
import { PayloadUser } from '../../../apresentation/protocols/payloadUsers'
export class DbConfirmSignupOwner implements VerifyOtpSignupOwner {
    constructor(
        private readonly verifyOtp: VerifyOTP,
        private readonly updateStatusAccountOwnerRepository: OwnerRepository,
        private readonly generateToken: GenerateToken,
    ) {}
    async verify(secret: string, email: string, otp: string, account?: any): Promise<string | null> {
        let result = null
        const verify = this.verifyOtp.isValid(secret, otp)

        if (verify) {
            result =
                await this.updateStatusAccountOwnerRepository.updateStatusAccountOwner(
                    email,
                )
            if (result && account) {
                const payload: PayloadUser = {
                    iss: 'www.rentacar',
                    aud: 'Rent a car',
                    sub: account.id,
                    statusAccount: account.statusAccount ?? true,
                    isSuspended: account.isSuspended ?? false,
                    email: account.email,
                    typeAccount: account.typeAccount ?? 'owner',
                    name: account.name,
                    lastName: account.lastName,
                }
                return this.generateToken.token(payload)
            }
        } else {
            result = null
            return null
        }

        return null
    }
} 