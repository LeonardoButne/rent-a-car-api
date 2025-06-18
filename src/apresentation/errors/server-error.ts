export class ServerError extends Error {
    constructor(data: string) {
        super(`Server Error: ${data}`)
        this.name = 'ServerError'
        this.stack = data
    }
}
