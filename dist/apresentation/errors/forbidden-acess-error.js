"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenAccessError = void 0;
class ForbiddenAccessError extends Error {
    constructor() {
        super("Acesso negado");
        this.name = "ForbiddenAccessError";
    }
}
exports.ForbiddenAccessError = ForbiddenAccessError;
//# sourceMappingURL=forbidden-acess-error.js.map