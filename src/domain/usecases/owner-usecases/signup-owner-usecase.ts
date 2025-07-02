export interface OwnerModel {
    id: string
    name: string
    lastName: string
    telephone: string
    email: string
    password: string
    typeAccount?: string
    statusAccount?: boolean
    isSuspended?: boolean
    address?: string
    subscriptionPackage?: string
    packageExpiresAt?: Date
    secretKey?: string
    token?: string
}

export type OwnerWithoutId = Omit<OwnerModel, 'id'>
export type OwnerForLogin = Omit<
    OwnerModel,
    | 'id'
    | 'name'
    | 'lastName'
    | 'telephone'
    | 'password'
    | 'typeAccount'
    | 'statusAccount'
    | 'secretKey'
>

export interface SignupOwner {
    add(dataOwner: OwnerWithoutId): Promise<OwnerModel>
} 