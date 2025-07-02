export type SendOtpType = {
    email : string
}

export interface ResendOtpOwner {
    send(email: string) : Promise<SendOtpType>
} 