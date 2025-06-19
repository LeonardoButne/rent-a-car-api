export interface ClientModel {
    id: string
    name: string
    lastName: string
    telephone: string
    email: string
    password: string
    typeAccount?: string
    statusAccount?: boolean
    secretKey?: string
    token?: string
}

export type ClientWithoutId = Omit<ClientModel, 'id'>
export type ClientForLogin = Omit<
    ClientModel,
    | 'id'
    | 'name'
    | 'lastName'
    | 'telephone'
    | 'password'
    | 'typeAccount'
    | 'statusAccount'
    | 'secretKey'
>

export interface SignupClient {
    add(dataUser: ClientWithoutId): Promise<ClientModel>
}
