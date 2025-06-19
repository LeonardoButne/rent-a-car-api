import { VerifyOTP } from '../../../apresentation/protocols/otp'
import { VerifyOtpSignupClient } from '../../../domain/usecases/user-usecases/confirm-signup-client-usecase'
import { UpdateStatusAccountClientRepository } from '../../repositories/user'

export class DbConfirmSignupUser implements VerifyOtpSignupClient {
    constructor(
        private readonly verifyOtp: VerifyOTP,
        private readonly updateStatusAccountUserRepository: UpdateStatusAccountClientRepository,
    ) {}
    async verify(secret: string, email: string, otp: string): Promise<boolean> {
        let result = null
        const verify = this.verifyOtp.isValid(secret, otp)

        if (verify) {
            result =
                await this.updateStatusAccountUserRepository.updateStatusAccountClient(
                    email,
                )
        } else {
            result = null
            return null
        }

        return result
    }
}
