import { OwnerAttributes } from "../../domain/models/owner"
import { OwnerModel, OwnerWithoutId } from "../../domain/usecases/owner-usecases/signup-owner-usecase"

export interface OwnerRepository {
    add(data: OwnerWithoutId): Promise<OwnerModel>
    getAccountByEmail(email: string): Promise<OwnerModel>
    getAccountById(id: string): Promise<OwnerAttributes>
    loadOwnerById(id: string, role?: string): Promise<OwnerAttributes>
    updateStatusAccountOwner(email: string): Promise<boolean>


}
