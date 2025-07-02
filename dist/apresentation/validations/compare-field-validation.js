"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareFieldValidation = void 0;
const errors_1 = require("../errors");
class CompareFieldValidation {
    fieldName;
    fieldCompare;
    constructor(fieldName, fieldCompare) {
        this.fieldName = fieldName;
        this.fieldCompare = fieldCompare;
    }
    validate(input) {
        if (input.body?.[this.fieldCompare] !== input.body?.[this.fieldName]) {
            return new errors_1.InvalidParamsError('senhas não coincidem.');
        }
    }
}
exports.CompareFieldValidation = CompareFieldValidation;
//# sourceMappingURL=compare-field-validation.js.map