export interface Comparetion {
    compare(password: string, hashedPassword: string): Promise<boolean>
}
