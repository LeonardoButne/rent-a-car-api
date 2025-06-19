import { ClientAttributes } from "../../../domain/models/client";


export interface LoadClientByTokenRepository {
    loadClientById: (accesstoken: string, role?: string) => Promise<ClientAttributes>
}