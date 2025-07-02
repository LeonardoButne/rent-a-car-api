export interface AdministratorModel {
    id: string
    userName: string
    email: string
    password: string
    typeAccount?: string
    statusAccount?: boolean
    secretKey?: string
    token?: string
}

export type AdministratorWithoutId = Omit<AdministratorModel, 'id'>
export type AdministratorForLogin = Omit<
    AdministratorModel,
    | 'id'
    | 'userName'
    | 'password'
    | 'typeAccount'
    | 'statusAccount'
    | 'secretKey'
>

export interface SignupAdministrator {
    add(dataAdministrator: AdministratorWithoutId): Promise<AdministratorModel>
} 