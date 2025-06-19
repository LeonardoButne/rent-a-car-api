import { ClientModel } from '../../../domain/usecases/user-usecases/signup-client-usecase'

export interface GetAccountClientByEmailRepository {
    getAccountByEmail(email: string): Promise<ClientModel>
}
