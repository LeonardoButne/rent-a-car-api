import { OwnerAttributes } from "../../models/owner";

export interface LoadOwnerById {
    loadOwnerById: (token: string, role?: string) => Promise<OwnerAttributes>
} 