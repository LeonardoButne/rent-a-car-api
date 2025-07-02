import { OwnerAttributes } from "../../models/owner";

export interface GetAccountOwner {
    getAccountById(id: string): Promise<OwnerAttributes>
} 