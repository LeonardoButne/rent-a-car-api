export interface SendEmail {
    send(
        subject: string,
        email: string,
        user: string,
        password: string,
        body?: string,
    ): void
}
