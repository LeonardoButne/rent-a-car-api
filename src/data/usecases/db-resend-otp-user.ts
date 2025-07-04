import { ResendOtpUserInput, ResendOtpUserUsecase } from '../../domain/usecases/resend-otp-user-usecase';
import { GetAccountClientByEmailRepository } from '../repositories/client-repository';
import { OwnerRepository } from '../repositories/owner-repository';
import { GenerateOTP } from '../../apresentation/protocols/otp';
import { SendEmail } from '../../apresentation/protocols/send-email';
import { globalConfig } from '../../config/value';

export class DbResendOtpUser implements ResendOtpUserUsecase {
  constructor(
    private readonly clientRepository: GetAccountClientByEmailRepository,
    private readonly ownerRepository: OwnerRepository,
    private readonly generateOtp: GenerateOTP,
    private readonly sendEmail: SendEmail,
  ) {}

  async resend(data: ResendOtpUserInput): Promise<boolean> {
    const { email } = data;
    // 1. Tenta como client
    let account = await this.clientRepository.getAccountByEmail(email);
    if (account) {
      const otp = this.generateOtp.otp(account.secretKey, 6, 300);
      globalConfig.saveData = otp;
      this.sendEmail.send(
        'Código OTP para login',
        account.email,
        process.env.EMAIL_SUPORT!,
        process.env.PASS_SUPORT!,
        `Por favor, insira o código OTP: <h1>${otp}</h1> no campo correspondente para continuar o login.`
      );
      return true;
    }
    // 2. Tenta como owner
    account = await this.ownerRepository.getAccountByEmail(email);
    if (account) {
      const otp = this.generateOtp.otp(account.secretKey, 6, 300);
      globalConfig.saveData = otp;
      this.sendEmail.send(
        'Código OTP para login',
        account.email,
        process.env.EMAIL_SUPORT!,
        process.env.PASS_SUPORT!,
        `Por favor, insira o código OTP: <h1>${otp}</h1> no campo correspondente para continuar o login.`
      );
      return true;
    }
    // 3. Não encontrou
    return false;
  }
} 