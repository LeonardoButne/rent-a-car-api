export class MissingParamError extends Error {
    constructor(nameParam: string) {
        super(`Campo vazio', ${nameParam}`)
        this.name = 'MissingParamError'
        this.stack = nameParam
    }
}
