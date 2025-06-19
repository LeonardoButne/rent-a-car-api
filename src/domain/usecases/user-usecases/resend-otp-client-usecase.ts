export type SendOtpType = {
    email : string
}

export interface ResendOtpClient {
    send(email: string) : Promise<SendOtpType>
}