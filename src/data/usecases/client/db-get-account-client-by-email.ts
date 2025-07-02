import { GetAccountClientByEmail } from '../../../domain/usecases/client-usecases/get-account-client-by-email-usecase';
import { ClientModel } from '../../../domain/usecases/client-usecases/signup-client-usecase';
import { GetAccountClientByEmailRepository } from '../../repositories/client-repository';

export class DbGetAccountUserByEmail implements GetAccountClientByEmail {
  constructor(private readonly getAccountUserbyEmailRepository: GetAccountClientByEmailRepository) {}
  async getAccountClientbyEmail(email: string): Promise<ClientModel> {
    const account = await this.getAccountUserbyEmailRepository.getAccountByEmail(email);

    if (!account) {
      return null;
    }
    return account;
  }
}
