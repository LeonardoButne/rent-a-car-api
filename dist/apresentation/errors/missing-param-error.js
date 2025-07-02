"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingParamError = void 0;
class MissingParamError extends Error {
    constructor(nameParam) {
        super(`Campo vazio', ${nameParam}`);
        this.name = 'MissingParamError';
        this.stack = nameParam;
    }
}
exports.MissingParamError = MissingParamError;
//# sourceMappingURL=missing-param-error.js.map