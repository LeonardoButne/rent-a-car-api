import { GenerateOTP } from '../../../apresentation/protocols/otp';
import { globalConfig } from '../../../config/value';
import { ResendOtpClient, SendOtpType } from '../../../domain/usecases/client-usecases/resend-otp-client-usecase';
import { GetAccountClientByEmailRepository } from '../../repositories/client-repository';

export class DbResendOtpUser implements ResendOtpClient {
  constructor(
    private readonly getAccountUserByEmailRepository: GetAccountClientByEmailRepository,
    private readonly generateOtp: GenerateOTP,
  ) {}

  async send(email: string): Promise<SendOtpType> {
    const account = await this.getAccountUserByEmailRepository.getAccountByEmail(email);

    if (!account) {
      return null;
    }

    const otp = this.generateOtp.otp(account.secretKey, 6, 300);

    globalConfig.saveData = otp;

    return {
      email: account.email,
    };
  }
}
