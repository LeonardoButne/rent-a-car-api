import { GenerateOTP } from '../../../apresentation/protocols/otp';
import { globalConfig } from '../../../config/value';
import { OwnerAttributes } from '../../../domain/models/owner';
import { AuthenticateOwner } from '../../../domain/usecases/owner-usecases/authenticate-owner-usecase';
import { OwnerForLogin } from '../../../domain/usecases/owner-usecases/signup-owner-usecase';
import { Comparetion } from '../../protocols/cryptography/compare';
import { OwnerRepository } from '../../repositories/owner-repository';

export class DbAuthenticateOwner implements AuthenticateOwner {
  constructor(
    private readonly getAccountOwnerByEmail: OwnerRepository,
    private readonly comparePassword: Comparetion,
    private readonly generateOtp: GenerateOTP,
  ) {}
  async auth(data: OwnerAttributes): Promise<OwnerForLogin | boolean> {
    const account = await this.getAccountOwnerByEmail.getAccountByEmail(data.email);

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