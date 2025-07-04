export class MissingParamError extends Error {
    constructor(nameParam: string) {
        super(`Campo obrigatório: ${nameParam}`)
        this.name = 'MissingParamError'
        this.stack = nameParam
    }
}
