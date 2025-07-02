import { VerifyOTP } from '../../../apresentation/protocols/otp';
import { VerifyOtpSignupClient } from '../../../domain/usecases/client-usecases/confirm-signup-client-usecase';
import { UpdateStatusAccountClientRepository } from '../../repositories/client-repository';
import { GenerateToken } from '../../protocols/cryptography/generate-token';
import { Payload } from '../../../apresentation/protocols/payload';

export class DbConfirmSignupUser implements VerifyOtpSignupClient {
  constructor(
    private readonly verifyOtp: VerifyOTP,
    private readonly updateStatusAccountUserRepository: UpdateStatusAccountClientRepository,
    private readonly generateToken: GenerateToken,
  ) {}
  async verify(secret: string, email: string, otp: string, account?: any): Promise<string | null> {
    let result = null;
    const verify = this.verifyOtp.isValid(secret, otp);

    if (verify) {
      result = await this.updateStatusAccountUserRepository.updateStatusAccountClient(email);
      if (result && account) {
        const payload: Payload = {
          iss: 'www.rentacar',
          aud: 'Rent a car',
          sub: account.id,
          statusAccount: account.statusAccount ?? true,
          email: account.email,
          typeAccount: account.typeAccount ?? 'client',
        };
        return this.generateToken.token(payload);
      }
    } else {
      result = null;
      return null;
    }

    return null;
  }
}
