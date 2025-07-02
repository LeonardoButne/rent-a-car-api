import { ClientAttributes } from '../../../domain/models/client';
import { LoadClientById } from '../../../domain/usecases/client-usecases/load-user-by-token-usecase';
import { Decrypter } from '../../protocols/decrypter/decrypter';
import { LoadClientByTokenRepository } from '../../repositories/client-repository';

export class DbLoadUserByToken implements LoadClientById {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadUserByTokenRepository: LoadClientByTokenRepository,
  ) {}

  async loadClientById(accesstoken: string, role?: string): Promise<ClientAttributes> {
    const token = await this.decrypter.decrypt(accesstoken);

    if (token) {
      const user = await this.loadUserByTokenRepository.loadClientById(`${token.sub}`, role);

      if (user) {
        return user;
      }
    }
    return null;
  }
}
