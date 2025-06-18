export class Forbidden extends Error {
    constructor(nameParam: string) {
        super(`Acesso negado para: ${nameParam}`)
        this.name = 'Forbidden'
        this.stack = nameParam
    }
}
