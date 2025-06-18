export class UnauthorizedError extends Error {
    constructor(data: string) {
        super(`Não autorizado (${data})`)
        this.name = 'UnauthorizedError'
        this.stack = data
    }
}
