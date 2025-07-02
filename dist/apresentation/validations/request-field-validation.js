"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestFieldValidation = void 0;
const errors_1 = require("../errors");
class RequestFieldValidation {
    fieldName;
    constructor(fieldName) {
        this.fieldName = fieldName;
    }
    validate(input) {
        const fieldFromBody = input.body?.[this.fieldName];
        const fieldFromFiles = input.files?.[this.fieldName];
        const isFileValid = Array.isArray(fieldFromFiles) && fieldFromFiles.length > 0;
        const isBodyValid = fieldFromBody !== undefined && fieldFromBody !== '';
        if (!isBodyValid && !isFileValid) {
            return new errors_1.MissingParamError(this.fieldName);
        }
    }
}
exports.RequestFieldValidation = RequestFieldValidation;
//# sourceMappingURL=request-field-validation.js.map