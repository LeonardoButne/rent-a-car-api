import { VerifyOTP } from '../../../apresentation/protocols/otp'
import { Payload } from '../../../apresentation/protocols/payload'
import { VerifyOtpLoginForAdministrator } from '../../../domain/usecases/administrator-usecases/verify-otp-login-administrator-usecase'
import { GenerateToken } from '../../protocols/cryptography/generate-token'
import { AdministratorRepository } from '../../repositories/administrator-repository'

export class DbVerifyOtpLoginAdministrator implements VerifyOtpLoginForAdministrator {
    constructor(
        private readonly getAccountAdministratorByEmailRepository: AdministratorRepository,
        private readonly verifyOtp: VerifyOTP,
        private readonly generateToken: GenerateToken,
    ) {}
    async verify(otp: string, email: string): Promise<string | boolean> {
        const account =
            await this.getAccountAdministratorByEmailRepository.getAccountByEmail(email)

        if (!account) {
            return null
        }

        const validateOtp = this.verifyOtp.isValid(account.secretKey, otp)

        if (!validateOtp) {
            return false
        }

        const payload: Payload = {
            iss: 'www.rentacar',
            aud: 'Rent a car',
            sub: account.id,
            statusAccount: account.statusAccount,
            email: account.email,
            typeAccount: 'admin',
        }

        return this.generateToken.token(payload)
    }
} 