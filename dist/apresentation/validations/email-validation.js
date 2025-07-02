"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidation = void 0;
const errors_1 = require("../errors");
class EmailValidation {
    emailField;
    emailValidator;
    constructor(emailField, emailValidator) {
        this.emailField = emailField;
        this.emailValidator = emailValidator;
    }
    validate(input) {
        const isValid = this.emailValidator.validate(`${input.body[this.emailField]}`);
        if (!isValid) {
            return new errors_1.EmailParamError(this.emailField);
        }
    }
}
exports.EmailValidation = EmailValidation;
//# sourceMappingURL=email-validation.js.map