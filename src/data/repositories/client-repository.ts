import { ClientModel, ClientWithoutId } from '../../domain/usecases/client-usecases/signup-client-usecase';
import { ClientAttributes } from '../../domain/models/client';

export interface AddAccountClientRepository {
  add(data: ClientWithoutId): Promise<ClientModel>;
}

export interface GetAccountClientByEmailRepository {
  getAccountByEmail(email: string): Promise<ClientModel>;
}

export interface GetAccountClientByIdRepository {
  getAccountById(id: string): Promise<ClientAttributes>;
}

export interface GetAccountClientByUserAndEmailRepository {
  getAccount(value: string): Promise<ClientModel>;
}

export interface LoadClientByTokenRepository {
  loadClientById: (accesstoken: string, role?: string) => Promise<ClientAttributes>;
}

export interface UpdateStatusAccountClientRepository {
  updateStatusAccountClient(email: string): Promise<[number]>;
}
