import { GenerateOTP } from '../../../apresentation/protocols/otp';
import { globalConfig } from '../../../config/value';
import { ClientAttributes } from '../../../domain/models/client';
import { Authenticate } from '../../../domain/usecases/user-usecases/authenticate-client-usecase';
import { ClientForLogin } from '../../../domain/usecases/user-usecases/signup-client-usecase';
import { Comparetion } from '../../protocols/cryptography/compare';
import { GetAccountClientByUserAndEmailRepository } from '../../repositories/user/get-account-client-by-user-and-email-repository';

export class DbAuthenticateClient implements Authenticate {
  constructor(
    private readonly getAccountAdmin: GetAccountClientByUserAndEmailRepository,
    private readonly comparePassword: Comparetion,
    private readonly generateOtp: GenerateOTP,
  ) {}
  async auth(data: ClientAttributes): Promise<ClientForLogin | boolean> {
    const account = await this.getAccountAdmin.getAccount(data.email);

    if (!account) {
      return null;
    }

    if (account) {
      const passwordToCompare = await this.comparePassword.compare(data.password, account.password);
      if (!passwordToCompare) {
        return null;
      }

      if (account.statusAccount === false) {
        return false;
      }

      globalConfig.saveData = this.generateOtp.otp(account.secretKey, 6, 300);

      return { email: account.email };
    }
  }
}
