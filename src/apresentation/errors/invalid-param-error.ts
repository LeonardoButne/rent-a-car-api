export class InvalidParamsError extends Error {
    constructor(nameParam: string) {
        super(`Dados invalidos, ${nameParam}`)
        this.name = 'InvalidParamsError'
        this.stack = nameParam
    }
}
