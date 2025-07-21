import { VerifyOtpLoginUserInput, VerifyOtpLoginUserUsecase } from '../../domain/usecases/verify-otp-login-user-usecase';
import { GetAccountClientByEmailRepository } from '../repositories/client-repository';
import { OwnerRepository } from '../repositories/owner-repository';
import { VerifyOTP } from '../../apresentation/protocols/otp';
import { GenerateToken } from '../protocols/cryptography/generate-token';
import { DeviceRepository } from '../repositories/device-repository';
import { Payload } from '../../apresentation/protocols/payload';
import { PayloadUser } from '../../apresentation/protocols/payloadUsers';

export class DbVerifyOtpLoginUser implements VerifyOtpLoginUserUsecase {
  constructor(
    private readonly clientRepository: GetAccountClientByEmailRepository,
    private readonly ownerRepository: OwnerRepository,
    private readonly verifyOtp: VerifyOTP,
    private readonly generateToken: GenerateToken,
    private readonly deviceRepository: DeviceRepository,
  ) {}

  async verify(data: VerifyOtpLoginUserInput): Promise<string | boolean> {
    const { email, otp, deviceId } = data;
    // 1. Tenta como client
    let account = await this.clientRepository.getAccountByEmail(email);
    if (account) {
      const validateOtp = this.verifyOtp.isValid(account.secretKey, otp);
      if (!validateOtp) return false;
      // Atualiza status para verificado
      if (account.statusAccount === false) {
        if (this.clientRepository.updateStatusAccountClient) {
          await this.clientRepository.updateStatusAccountClient(email);
          account.statusAccount = true;
        }
      }
      if (deviceId) {
        await this.deviceRepository.addDevice({
          userId: account.id,
          userType: 'client',
          deviceId,
        });
      }
      const payload: Payload = {
        iss: 'www.rentacar',
        aud: 'Rent a car',
        sub: account.id,
        statusAccount: account.statusAccount,
        email: account.email,
        typeAccount: 'client',
        name: account.name,
        lastName: account.lastName,
      };
      return this.generateToken.token(payload);
    }
    // 2. Tenta como owner
    account = await this.ownerRepository.getAccountByEmail(email);
    if (account) {
      const validateOtp = this.verifyOtp.isValid(account.secretKey, otp);
      if (!validateOtp) return false;
      // Atualiza status para verificado
      if (account.statusAccount === false) {
        if (this.ownerRepository.updateStatusAccountOwner) {
          await this.ownerRepository.updateStatusAccountOwner(email);
          account.statusAccount = true;
        }
      }
      if (deviceId) {
        await this.deviceRepository.addDevice({
          userId: account.id,
          userType: 'owner',
          deviceId,
        });
      }
      const payload: PayloadUser = {
        iss: 'www.rentacar',
        aud: 'Rent a car',
        sub: account.id,
        statusAccount: account.statusAccount,
        isSuspended: account.isSuspended,
        email: account.email,
        typeAccount: 'owner',
        name: account.name,
        lastName: account.lastName,
      };
      return this.generateToken.token(payload);
    }
    // 3. Não encontrou
    return null;
  }
} 