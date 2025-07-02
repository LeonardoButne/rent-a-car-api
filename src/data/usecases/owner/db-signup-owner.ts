import { GenerateSecret } from '../../../apresentation/protocols/generate-secret'
import { GenerateOTP } from '../../../apresentation/protocols/otp'
import { globalConfig } from '../../../config/value'
import {
    OwnerModel,
    OwnerWithoutId,
    SignupOwner,
} from '../../../domain/usecases/owner-usecases/signup-owner-usecase'
import { Hashed } from '../../protocols/cryptography/hash'
import { OwnerRepository } from '../../repositories/owner-repository'

export class DbSignupOwner implements SignupOwner {
    constructor(
        private readonly hassPassword: Hashed,
        private readonly generateSecret: GenerateSecret,
        private readonly signupOwnerRepository: OwnerRepository,
        private readonly generateOtp: GenerateOTP,
    ) {}
    async add(dataOwner: OwnerWithoutId): Promise<OwnerModel> {
        const hashPassword = await this.hassPassword.hash(dataOwner.password)
        const generatedSecret = this.generateSecret.genarate(20)
        
        const addOwner = await this.signupOwnerRepository.add(
            Object.assign({}, dataOwner, {
                password: hashPassword,
                secretKey: generatedSecret,
            }),
        )

        globalConfig.saveData = this.generateOtp.otp(generatedSecret, 6, 300)

        return addOwner
    }
} 