import { GenerateOTP } from '../../../apresentation/protocols/otp';
import { globalConfig } from '../../../config/value';
import { AdministradorAttributes } from '../../../domain/models/administrator';
import { AuthenticateAdministrator } from '../../../domain/usecases/administrator-usecases/login-administrator-usecase';
import { AdministratorForLogin } from '../../../domain/usecases/administrator-usecases/signup-administrator-usecase';
import { Comparetion } from '../../protocols/cryptography/compare';
import { AdministratorRepository } from '../../repositories/administrator-repository';

export class DbAuthenticateAdministrator implements AuthenticateAdministrator {
  constructor(
    private readonly getAccountAdministratorByEmail: AdministratorRepository,
    private readonly comparePassword: Comparetion,
    private readonly generateOtp: GenerateOTP,
  ) {}
  async auth(data: AdministradorAttributes): Promise<AdministratorForLogin | boolean> {
    const account = await this.getAccountAdministratorByEmail.getAccountByEmail(data.email);

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