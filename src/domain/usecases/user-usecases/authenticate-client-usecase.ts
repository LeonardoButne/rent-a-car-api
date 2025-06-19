import { ClientForLogin } from "./signup-client-usecase"

export type AuthenticateAttributes = {
    value: string
    password: string
}

export interface Authenticate{
    auth(data: AuthenticateAttributes): Promise<ClientForLogin | boolean>
}