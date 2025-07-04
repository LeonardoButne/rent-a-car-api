export type Payload = {
    iss: string
    aud: string
    sub?: string
    statusAccount: boolean
    email?: string
    typeAccount?: string // 'admin' | 'owner' | 'client'
    name?: string
    lastName?: string
}
