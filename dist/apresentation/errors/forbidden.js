"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = void 0;
class Forbidden extends Error {
    constructor(nameParam) {
        super(`Acesso negado para: ${nameParam}`);
        this.name = 'Forbidden';
        this.stack = nameParam;
    }
}
exports.Forbidden = Forbidden;
//# sourceMappingURL=forbidden.js.map