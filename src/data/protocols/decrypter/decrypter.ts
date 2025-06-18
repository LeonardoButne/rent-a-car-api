export type TokenData = {
    iss?: string
    aud?: string
    sub: string
    username: string
    email: string
    role: string 
    iat?: string
}

export interface Decrypter{
    decrypt: (value: string) => Promise <TokenData | string>
}