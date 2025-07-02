"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError extends Error {
    constructor(data) {
        super(`Server Error: ${data}`);
        this.name = 'ServerError';
        this.stack = data;
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=server-error.js.map