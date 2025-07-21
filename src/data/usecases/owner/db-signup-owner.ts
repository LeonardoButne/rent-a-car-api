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
import { SendEmail } from '../../../apresentation/protocols/send-email'

export class DbSignupOwner implements SignupOwner {
    constructor(
        private readonly hassPassword: Hashed,
        private readonly generateSecret: GenerateSecret,
        private readonly signupOwnerRepository: OwnerRepository,
        private readonly generateOtp: GenerateOTP,
        private readonly sendEmail: SendEmail,
    ) {}
    async add(dataOwner: OwnerWithoutId): Promise<OwnerModel> {
        // Verifica se já existe owner com esse e-mail
        const existing = await this.signupOwnerRepository.getAccountByEmail(dataOwner.email);
        if (existing) {
            if (existing.statusAccount === false) {
                // Gera e envia o OTP para o owner já cadastrado e não verificado
                const otp = this.generateOtp.otp(existing.secretKey, 6, 300);
                globalConfig.saveData = otp;
                this.sendEmail.send(
                    'Código OTP para cadastro',
                    existing.email,
                    process.env.EMAIL_SUPORT!,
                    process.env.PASS_SUPORT!,
                    `Por favor, insira o código OTP: <h1>${otp}</h1> para ativar sua conta.`
                );
                throw { otp_required: true, message: 'E-mail já cadastrado, mas ainda não verificado. Complete a verificação.' };
            } else {
                throw { message: 'E-mail já cadastrado.' };
            }
        }
        const hashPassword = await this.hassPassword.hash(dataOwner.password)
        const generatedSecret = this.generateSecret.genarate(20)
        
        const addOwner = await this.signupOwnerRepository.add(
            Object.assign({}, dataOwner, {
                password: hashPassword,
                secretKey: generatedSecret,
            }),
        )

        // Gera e envia o OTP para o novo owner
        const otp = this.generateOtp.otp(generatedSecret, 6, 300);
        globalConfig.saveData = otp;
        this.sendEmail.send(
            'Código OTP para cadastro',
            dataOwner.email,
            process.env.EMAIL_SUPORT!,
            process.env.PASS_SUPORT!,
            `Por favor, insira o código OTP: <h1>${otp}</h1> para ativar sua conta.`
        );

        return addOwner
    }
} 