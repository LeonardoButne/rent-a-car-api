import { ClientAttributes } from "../../models/client";

export interface GetAccountClient {
    getAccountById(id: string): Promise<ClientAttributes>
}
