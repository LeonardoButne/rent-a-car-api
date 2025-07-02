import { GenerateSecret } from '../../../apresentation/protocols/generate-secret'
import { GenerateOTP } from '../../../apresentation/protocols/otp'
import { globalConfig } from '../../../config/value'
import {
    AdministratorModel,
    AdministratorWithoutId,
    SignupAdministrator,
} from '../../../domain/usecases/administrator-usecases/signup-administrator-usecase'
import { Hashed } from '../../protocols/cryptography/hash'
import { AdministratorRepository } from '../../repositories/administrator-repository'

export class DbSignupAdministrator implements SignupAdministrator {
    constructor(
        private readonly hassPassword: Hashed,
        private readonly generateSecret: GenerateSecret,
        private readonly signupAdministratorRepository: AdministratorRepository,
        private readonly generateOtp: GenerateOTP,
    ) {}
    async add(dataAdministrator: AdministratorWithoutId): Promise<AdministratorModel> {
        const hashPassword = await this.hassPassword.hash(dataAdministrator.password)
        const generatedSecret = this.generateSecret.genarate(20)
        
        const addAdmin = await this.signupAdministratorRepository.add(
            Object.assign({}, dataAdministrator, {
                password: hashPassword,
                secretKey: generatedSecret,
            }),
        )

        globalConfig.saveData = this.generateOtp.otp(generatedSecret, 6, 300)

        return addAdmin
    }
}
