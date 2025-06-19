import { ClientModel } from '../../../domain/usecases/user-usecases/signup-client-usecase';

export interface GetAccountClientByUserAndEmailRepository {
  getAccount(value: string): Promise<ClientModel>;
}
