export interface Hashed {
    hash(data: string): Promise<string>
}
