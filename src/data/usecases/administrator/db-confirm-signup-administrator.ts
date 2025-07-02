import { VerifyOTP } from '../../../apresentation/protocols/otp'
import { VerifyOtpSignupAdministrator } from '../../../domain/usecases/administrator-usecases/confirm-signup-administrator-usecase'
import { AdministratorRepository } from '../../repositories/administrator-repository'

export class DbConfirmSignupAdministrator implements VerifyOtpSignupAdministrator {
    constructor(
        private readonly verifyOtp: VerifyOTP,
        private readonly updateStatusAccountAdministratorRepository: AdministratorRepository,
    ) {}
    async verify(secret: string, email: string, otp: string): Promise<boolean> {
        let result = null
        const verify = this.verifyOtp.isValid(secret, otp)

        if (verify) {
            result =
                await this.updateStatusAccountAdministratorRepository.updateStatusAccountAdministrator(
                    email,
                )
        } else {
            result = null
            return null
        }

        return result
    }
}
