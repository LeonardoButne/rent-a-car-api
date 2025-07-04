import { VerifyOTP } from '../../../apresentation/protocols/otp'
import { Payload } from '../../../apresentation/protocols/payload'
import { PayloadUser } from '../../../apresentation/protocols/payloadUsers'
import { VerifyOtpLoginForOwner } from '../../../domain/usecases/owner-usecases/verify-otp-login-owner-usecase'
import { GenerateToken } from '../../protocols/cryptography/generate-token'
import { OwnerRepository } from '../../repositories/owner-repository'
import { DeviceRepository } from '../../repositories/device-repository'

export class DbVerifyOtpLoginOwner implements VerifyOtpLoginForOwner {
    constructor(
        private readonly getAccountOwnerByEmailRepository: OwnerRepository,
        private readonly verifyOtp: VerifyOTP,
        private readonly generateToken: GenerateToken,
        private readonly deviceRepository: DeviceRepository,
    ) {}
    async verify(otp: string, email: string, deviceId?: string): Promise<string | boolean> {
        const account =
            await this.getAccountOwnerByEmailRepository.getAccountByEmail(email)

        if (!account) {
            return null
        }

        const validateOtp = this.verifyOtp.isValid(account.secretKey, otp)

        if (!validateOtp) {
            return false
        }

        // Cadastrar device se deviceId informado
        if (deviceId) {
            await this.deviceRepository.addDevice({
                userId: account.id,
                userType: 'owner',
                deviceId,
            })
        }

        const payload: PayloadUser = {
            iss: 'www.rentacar',
            aud: 'Rent a car',
            sub: account.id,
            statusAccount: account.statusAccount,
            isSuspended: account.isSuspended,
            email: account.email,
            typeAccount: 'owner',
            name: account.name,
            lastName: account.lastName,
        }

        return this.generateToken.token(payload)
    }
} 