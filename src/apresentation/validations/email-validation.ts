import { EmailParamError } from "../errors"
import { EmailValidator } from "../protocols/email-validatior"
import { Validation } from "../protocols/validation"

export class EmailValidation implements Validation {
    constructor(
        private readonly emailField: string,
        private readonly emailValidator: EmailValidator,
    ) {}

    validate(input: any): Error {
        const isValid = this.emailValidator.validate(
            `${input.body[this.emailField]}`,
        )

        if (!isValid) {
            return new EmailParamError(this.emailField)
        }
    }
}
