export class EmailParamError extends Error {
    constructor(nameParam: string) {
        super(`Campo invalido: ${nameParam}`)
        this.name = 'EmailParamError'
        this.stack = nameParam
    }
}
