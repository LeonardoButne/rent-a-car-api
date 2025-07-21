import { MissingParamError } from '../errors'
import { Validation } from '../protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}
  validate(input: any): Error | null {
    if (!input.body || !input.body[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
    return null;
  }
}
