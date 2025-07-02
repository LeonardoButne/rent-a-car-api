"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParamsError = void 0;
class InvalidParamsError extends Error {
    constructor(nameParam) {
        super(`Dados invalidos, ${nameParam}`);
        this.name = 'InvalidParamsError';
        this.stack = nameParam;
    }
}
exports.InvalidParamsError = InvalidParamsError;
//# sourceMappingURL=invalid-param-error.js.map