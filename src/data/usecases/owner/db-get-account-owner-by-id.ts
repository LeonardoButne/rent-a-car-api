import { GetAccountOwner } from "../../../domain/usecases/owner-usecases/get-account-owner-by-id-usecase"
import { OwnerAttributes } from "../../../domain/models/owner"
import { OwnerRepository } from "../../repositories/owner-repository"

export class DbGetAccountOwnerById implements GetAccountOwner {
    constructor(
        private readonly getAccountOwnerByIdRepository: OwnerRepository,
    ) {}
    async getAccountById(id: string): Promise<OwnerAttributes> {
        const account = await this.getAccountOwnerByIdRepository.getAccountById(id)

        if (!account) {
            return null
        }

        return account
    }
} 