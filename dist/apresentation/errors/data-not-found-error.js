"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataNotFoundError = void 0;
class DataNotFoundError extends Error {
    constructor(nameParam) {
        super(`Dados não localizado (${nameParam})`);
        this.name = 'DataNotFoundError';
        // this.stack =
    }
}
exports.DataNotFoundError = DataNotFoundError;
//# sourceMappingURL=data-not-found-error.js.map