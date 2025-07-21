import { GenerateSecret } from '../../../apresentation/protocols/generate-secret';
import { GenerateOTP } from '../../../apresentation/protocols/otp';
import { globalConfig } from '../../../config/value';
import {
  ClientModel,
  ClientWithoutId,
  SignupClient,
} from '../../../domain/usecases/client-usecases/signup-client-usecase';
import { Hashed } from '../../protocols/cryptography/hash';
import { AddAccountClientRepository } from '../../repositories/client-repository';
import { SendEmail } from '../../../apresentation/protocols/send-email';

export class DbSignupUser implements SignupClient {
  constructor(
    private readonly hassPassword: Hashed,
    private readonly generateSecret: GenerateSecret,
    private readonly signupUserResponitory: AddAccountClientRepository,
    private readonly generateOtp: GenerateOTP,
    private readonly sendEmail: SendEmail,
  ) {}
  async add(dataUser: ClientWithoutId): Promise<ClientModel> {
    // Verifica se já existe cliente com esse e-mail
    const existing = await this.signupUserResponitory.getAccountByEmail(dataUser.email);
    if (existing) {
      if (existing.statusAccount === false) {
        // Gera e envia o OTP para o usuário já cadastrado e não verificado
        const otp = this.generateOtp.otp(existing.secretKey, 6, 300);
        globalConfig.saveData = otp;
        if (existing.email) {
          this.sendEmail.send(
            'Código OTP para cadastro',
            existing.email,
            process.env.EMAIL_SUPORT!,
            process.env.PASS_SUPORT!,
            `Por favor, insira o código OTP: <h1>${otp}</h1> para ativar sua conta.`
          );
        }
        throw { otp_required: true, message: 'E-mail já cadastrado, mas ainda não verificado. Complete a verificação.' };
      } else {
        throw { message: 'E-mail já cadastrado.' };
      }
    }
    const hashPassword = await this.hassPassword.hash(dataUser.password);
    const generatedSecret = this.generateSecret.genarate(20);

    const addAmin = await this.signupUserResponitory.add(
      Object.assign({}, dataUser, {
        password: hashPassword,
        secretKey: generatedSecret,
      }),
    );

    // Gera e envia o OTP para o novo usuário
    const otp = this.generateOtp.otp(generatedSecret, 6, 300);
    globalConfig.saveData = otp;
    this.sendEmail.send(
      'Código OTP para cadastro',
      dataUser.email,
      process.env.EMAIL_SUPORT!,
      process.env.PASS_SUPORT!,
      `Por favor, insira o código OTP: <h1>${otp}</h1> para ativar sua conta.`
    );

    return addAmin;
  }
}
