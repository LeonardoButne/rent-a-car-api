import { GenerateSecret } from '../../../apresentation/protocols/generate-secret'
import { GenerateOTP } from '../../../apresentation/protocols/otp'
import { globalConfig } from '../../../config/value'
import {
    ClientModel,
    ClientWithoutId,
    SignupClient,
} from '../../../domain/usecases/user-usecases/signup-client-usecase'
import { Hashed } from '../../protocols/cryptography/hash'
import { AddAccountClientRepository } from '../../repositories/user'


export class DbSignupUser implements SignupClient {
    constructor(
        private readonly hassPassword: Hashed,
        private readonly generateSecret: GenerateSecret,
        private readonly signupUserResponitory: AddAccountClientRepository,
        private readonly generateOtp: GenerateOTP,
    ) {}
    async add(dataUser: ClientWithoutId): Promise<ClientModel> {
        const hashPassword = await this.hassPassword.hash(dataUser.password)
        const generatedSecret = this.generateSecret.genarate(20)
        
        const addAmin = await this.signupUserResponitory.add(
            Object.assign({}, dataUser, {
                password: hashPassword,
                secretKey: generatedSecret,
            }),
        )

        globalConfig.saveData = this.generateOtp.otp(generatedSecret, 6, 300)

        return addAmin
    }
}
