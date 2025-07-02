import { ClientAttributes } from "../../models/client";


export interface LoadClientById {
    loadClientById: (token: string, role?: string) => Promise<ClientAttributes>
}