import { ConfirmSignupUserUsecase, ConfirmSignupUserInput } from '../../domain/usecases/confirm-signup-user-usecase';
import { GetAccountClientByEmailRepository, UpdateStatusAccountClientRepository } from '../repositories/client-repository';
import { OwnerRepository } from '../repositories/owner-repository';
import { DeviceRepository } from '../repositories/device-repository';
import { VerifyOTP } from '../../apresentation/protocols/otp';
import { JwtAdapter } from '../../infraestruture/cryptograph/jwt/jwt-adpter';

export class DbConfirmSignupUser implements ConfirmSignupUserUsecase {
  constructor(
    private readonly clientRepository: GetAccountClientByEmailRepository & UpdateStatusAccountClientRepository,
    private readonly ownerRepository: OwnerRepository,
    private readonly deviceRepository: DeviceRepository,
    private readonly verifyOtpAdapter: VerifyOTP,
    private readonly jwtAdapter: JwtAdapter
  ) {}

  async confirm(data: ConfirmSignupUserInput): Promise<{ token?: string; typesActivated: string[] } | Error> {
    const { email, otp, deviceId } = data;
    const typesActivated: string[] = [];
    let token: string | undefined = undefined;

    // Client
    const client = await this.clientRepository.getAccountByEmail(email);
    if (client) {
      const isValid = this.verifyOtpAdapter.isValid(client.secretKey, otp);
      if (isValid) {
        await this.clientRepository.updateStatusAccountClient(email);
        typesActivated.push('client');
        token = this.jwtAdapter.token({
          iss: 'rent-a-car-api',
          aud: 'rent-a-car-client',
          sub: client.id,
          email: client.email,
          name: client.name,
          lastName: client.lastName,
          typeAccount: 'client',
          statusAccount: true,
        });
        if (deviceId) {
          await this.deviceRepository.addDevice({
            userId: client.id,
            userType: 'client',
            deviceId,
          });
        }
      }
    }

    // Owner
    const owner = await this.ownerRepository.getAccountByEmail(email);
    if (owner) {
      const isValid = this.verifyOtpAdapter.isValid(owner.secretKey, otp);
      if (isValid) {
        await this.ownerRepository.updateStatusAccountOwner(email);
        typesActivated.push('owner');
        if (!token) {
          token = this.jwtAdapter.token({
            iss: 'rent-a-car-api',
            aud: 'rent-a-car-client',
            sub: owner.id,
            email: owner.email,
            name: owner.name,
            lastName: owner.lastName,
            typeAccount: 'owner',
            statusAccount: true,
          });
        }
        if (deviceId) {
          await this.deviceRepository.addDevice({
            userId: owner.id,
            userType: 'owner',
            deviceId,
          });
        }
      }
    }

    if (typesActivated.length === 0) {
      return new Error('Email ou código OTP inválido');
    }

    return { token, typesActivated };
  }
} 