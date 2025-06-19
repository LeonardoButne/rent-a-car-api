import { MissingParamError } from "../errors"
import { Validation } from "../protocols/validation"

export class RequestFieldValidation implements Validation {
    constructor(private readonly fieldName: string) {}

    validate(input: any): Error | undefined {
        const fieldFromBody = input.body?.[this.fieldName]
        const fieldFromFiles = input.files?.[this.fieldName]

        const isFileValid = Array.isArray(fieldFromFiles) && fieldFromFiles.length > 0
        const isBodyValid = fieldFromBody !== undefined && fieldFromBody !== ''

        if (!isBodyValid && !isFileValid) {
            return new MissingParamError(this.fieldName)
        }
    }
}
