import { InvalidParamsError } from '../errors'
import { Validation } from '../protocols/validation'

export class CompareFieldValidation implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly fieldCompare: string,
    ) {}
    validate(input: any): Error {
        if (input.body?.[this.fieldCompare] !== input.body?.[this.fieldName]) {
            return new InvalidParamsError('senhas não coincidem')
        }
    }
}
