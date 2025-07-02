"use strict";
// RequestFileValidation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestFileValidation = void 0;
const errors_1 = require("../errors");
class RequestFileValidation {
    fieldName;
    constructor(fieldName) {
        this.fieldName = fieldName;
    }
    validate(input) {
        const files = input.files;
        if (!files || !files[this.fieldName] || files[this.fieldName].length === 0) {
            return new errors_1.MissingParamError(this.fieldName);
        }
        return null;
    }
}
exports.RequestFileValidation = RequestFileValidation;
//# sourceMappingURL=request-file-validation.js.map