import { ClientAttributes } from '../../../domain/models/client'

export interface GetAccountClientByIdRepository {
    getAccountById(id: string): Promise<ClientAttributes>
}
