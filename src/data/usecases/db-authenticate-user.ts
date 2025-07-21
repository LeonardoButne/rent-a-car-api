import { AuthenticateUserInput, AuthenticateUserOutput, AuthenticateUserUsecase } from '../../domain/usecases/authenticate-user-usecase';
import { GetAccountClientByEmailRepository } from '../repositories/client-repository';
import { OwnerRepository } from '../repositories/owner-repository';
import { Comparetion } from '../protocols/cryptography/compare';
import { GenerateToken } from '../protocols/cryptography/generate-token';
import { PayloadUser } from '../../apresentation/protocols/payloadUsers';
import { DeviceRepository } from '../repositories/device-repository';
import { GenerateOTP } from '../../apresentation/protocols/otp';
import { SendEmail } from '../../apresentation/protocols/send-email';
import { globalConfig } from '../../config/value';

export class DbAuthenticateUser implements AuthenticateUserUsecase {
  constructor(
    private readonly clientRepository: GetAccountClientByEmailRepository,
    private readonly ownerRepository: OwnerRepository,
    private readonly comparePassword: Comparetion,
    private readonly generateToken: GenerateToken,
    private readonly deviceRepository: DeviceRepository,
    private readonly generateOtp: GenerateOTP,
    private readonly sendEmail: SendEmail
  ) {}

  async auth(data: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const { email, password, deviceId } = data;
    // 1. Tenta encontrar como client
    let account = await this.clientRepository.getAccountByEmail(email);
    if (account) {
      const passwordMatch = await this.comparePassword.compare(password, account.password);
      if (!passwordMatch) return 'invalid_credentials';
      if (account.statusAccount === false) {
        // Gera e envia o OTP ANTES de retornar
        const otp = this.generateOtp.otp(account.secretKey, 6, 300);
        globalConfig.saveData = otp;
        this.sendEmail.send(
          'Código OTP para login',
          account.email,
          process.env.EMAIL_SUPORT!,
          process.env.PASS_SUPORT!,
          `Por favor, insira o código OTP: <h1>${otp}</h1> no campo correspondente para continuar o login.`
        );
        return { otp_required: true, message: 'Seu e-mail ainda não foi verificado. Complete a verificação para acessar sua conta.' };
      }
      // Verifica device
      if (deviceId) {
        const device = await this.deviceRepository.findDevice(account.id, 'client', deviceId);
        if (device) {
          // Device já cadastrado, login direto
          const payload: PayloadUser = {
            iss: 'www.rentacar',
            aud: 'Rent a car',
            sub: account.id,
            statusAccount: account.statusAccount ?? true,
            isSuspended: account.isSuspended ?? false,
            email: account.email,
            typeAccount: account.typeAccount ?? 'client',
            name: account.name,
            lastName: account.lastName,
          };
          const token = this.generateToken.token(payload);
          return {
            id: account.id,
            email: account.email,
            name: account.name,
            lastName: account.lastName,
            role: 'client',
            token,
          };
        }
      }
      // Se não tem deviceId ou não está cadastrado, gera e envia OTP
      const otp = this.generateOtp.otp(account.secretKey, 6, 300);
      globalConfig.saveData = otp;
      this.sendEmail.send(
        'Código OTP para login',
        account.email,
        process.env.EMAIL_SUPORT!,
        process.env.PASS_SUPORT!,
        `Por favor, insira o código OTP: <h1>${otp}</h1> no campo correspondente para continuar o login.`
      );
      return { otp_required: true, message: 'Novo dispositivo detectado. Um código de verificação foi enviado para seu e-mail.' };
    }
    // 2. Tenta encontrar como owner
    account = await this.ownerRepository.getAccountByEmail(email);
    if (account) {
      const passwordMatch = await this.comparePassword.compare(password, account.password);
      if (!passwordMatch) return 'invalid_credentials';
      if (account.statusAccount === false) {
        // Gera e envia o OTP ANTES de retornar
        const otp = this.generateOtp.otp(account.secretKey, 6, 300);
        globalConfig.saveData = otp;
        this.sendEmail.send(
          'Código OTP para login',
          account.email,
          process.env.EMAIL_SUPORT!,
          process.env.PASS_SUPORT!,
          `Por favor, insira o código OTP: <h1>${otp}</h1> no campo correspondente para continuar o login.`
        );
        return { otp_required: true, message: 'Seu e-mail ainda não foi verificado. Complete a verificação para acessar sua conta.' };
      }
      if (deviceId) {
        const device = await this.deviceRepository.findDevice(account.id, 'owner', deviceId);
        if (device) {
          // Device já cadastrado, login direto
          const payload: PayloadUser = {
            iss: 'www.rentacar',
            aud: 'Rent a car',
            sub: account.id,
            statusAccount: account.statusAccount ?? true,
            isSuspended: account.isSuspended ?? false,
            email: account.email,
            typeAccount: account.typeAccount ?? 'owner',
            name: account.name,
            lastName: account.lastName,
          };
          const token = this.generateToken.token(payload);
          return {
            id: account.id,
            email: account.email,
            name: account.name,
            lastName: account.lastName,
            role: 'owner',
            token,
          };
        }
      }
      // Se não tem deviceId ou não está cadastrado, gera e envia OTP
      const otp = this.generateOtp.otp(account.secretKey, 6, 300);
      globalConfig.saveData = otp;
      this.sendEmail.send(
        'Código OTP para login',
        account.email,
        process.env.EMAIL_SUPORT!,
        process.env.PASS_SUPORT!,
        `Por favor, insira o código OTP: <h1>${otp}</h1> no campo correspondente para continuar o login.`
      );
      return { otp_required: true, message: 'Novo dispositivo detectado. Um código de verificação foi enviado para seu e-mail.' };
    }
    // 3. Não encontrou em nenhuma tabela
    return null;
  }
} 