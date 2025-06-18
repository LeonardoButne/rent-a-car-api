import { EmailValidator } from '../../apresentation/protocols/email-validatior'
import validator from 'validator'

export class EmailValidationAdapter implements EmailValidator {
    validate(email: string): boolean {
        return validator.isEmail(email)
    }
}
