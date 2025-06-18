export class DataNotFoundError extends Error {
    constructor(nameParam: string) {
        super(`Dados não localizado (${nameParam})`)
        this.name = 'DataNotFoundError'
        // this.stack =
    }
}
