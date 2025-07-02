import { GetAccountClient } from '../../../domain/usecases/client-usecases/get-account-client-by-id-usecase';
import { ClientAttributes } from '../../../domain/models/client';
import { GetAccountClientByIdRepository } from '../../repositories/client-repository';

export class DbGetAccountClientById implements GetAccountClient {
  constructor(private readonly getAccountClientByIdRepository: GetAccountClientByIdRepository) {}
  async getAccountById(id: string): Promise<ClientAttributes> {
    const account = await this.getAccountClientByIdRepository.getAccountById(id);

    if (!account) {
      return null;
    }

    return account;
  }
}
