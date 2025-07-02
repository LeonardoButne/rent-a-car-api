"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailParamError = void 0;
class EmailParamError extends Error {
    constructor(nameParam) {
        super(`Campo invalido: ${nameParam}`);
        this.name = 'EmailParamError';
        this.stack = nameParam;
    }
}
exports.EmailParamError = EmailParamError;
//# sourceMappingURL=email-param-error.js.map