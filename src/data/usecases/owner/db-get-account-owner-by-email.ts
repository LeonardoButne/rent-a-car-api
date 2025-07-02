import { GetAccountOwnerByEmail } from "../../../domain/usecases/owner-usecases/get-account-owner-by-email-usecase"
import { OwnerModel } from "../../../domain/usecases/owner-usecases/signup-owner-usecase"
import { OwnerRepository } from "../../repositories/owner-repository"

export class DbGetAccountOwnerByEmail implements GetAccountOwnerByEmail {
    constructor(
        private readonly getAccountOwnerByEmailRepository: OwnerRepository,
    ) {}
    async getAccountOwnerbyEmail(email: string): Promise<OwnerModel> {
        const account =
            await this.getAccountOwnerByEmailRepository.getAccountByEmail(email)

        if (!account) {
            return null
        }
        return account
    }
} 