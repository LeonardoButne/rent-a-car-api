export type PayloadUser = {
    iss: string
    aud: string
    sub?: string
    statusAccount: boolean
    isSuspended: boolean
    email?: string
    typeAccount?: string // 'admin' | 'owner' | 'client'
}
