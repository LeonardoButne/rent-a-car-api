import { GetAccountClientByEmail } from "../../../domain/usecases/user-usecases/get-account-client-by-email-usecase"
import { ClientModel } from "../../../domain/usecases/user-usecases/signup-client-usecase"
import { GetAccountClientByEmailRepository } from "../../repositories/user"

export class DbGetAccountUserByEmail implements GetAccountClientByEmail {
    constructor(
        private readonly getAccountUserbyEmailRepository: GetAccountClientByEmailRepository,
    ) {}
    async getAccountClientbyEmail(email: string): Promise<ClientModel> {
        const account =
            await this.getAccountUserbyEmailRepository.getAccountByEmail(email)

        if (!account) {
            return null
        }
        return account
    }
}
