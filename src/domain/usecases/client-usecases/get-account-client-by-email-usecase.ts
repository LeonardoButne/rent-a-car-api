import { ClientModel } from './signup-client-usecase'

export interface GetAccountClientByEmail {
    getAccountClientbyEmail(email: string): Promise<ClientModel>
}
