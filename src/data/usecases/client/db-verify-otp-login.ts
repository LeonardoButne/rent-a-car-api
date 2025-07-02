import { VerifyOTP } from '../../../apresentation/protocols/otp';
import { Payload } from '../../../apresentation/protocols/payload';
import { VerifyOtpLoginForClient } from '../../../domain/usecases/client-usecases/verify-otp-login-client-usecase';
import { GenerateToken } from '../../protocols/cryptography/generate-token';
import { GetAccountClientByEmailRepository } from '../../repositories/client-repository';

export class DbVerifyOtpLogin implements VerifyOtpLoginForClient {
  constructor(
    private readonly getAccountAdminByEmailRepository: GetAccountClientByEmailRepository,
    private readonly verifyOtp: VerifyOTP,
    private readonly generateToken: GenerateToken,
  ) {}
  async verify(otp: string, email: string): Promise<string | boolean> {
    const account = await this.getAccountAdminByEmailRepository.getAccountByEmail(email);

    if (!account) {
      return null;
    }

    const validateOtp = this.verifyOtp.isValid(account.secretKey, otp);

    if (!validateOtp) {
      return false;
    }

    const payload: Payload = {
      iss: 'www.rentacar',
      aud: 'Rent a car',
      sub: account.id,
      statusAccount: account.statusAccount,
      email: account.email,
      typeAccount: 'client',
    };

    return this.generateToken.token(payload);
  }
}
