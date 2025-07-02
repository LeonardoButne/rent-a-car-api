import { OwnerModel } from './signup-owner-usecase'

export interface GetAccountOwnerByEmail {
    getAccountOwnerbyEmail(email: string): Promise<OwnerModel>
} 