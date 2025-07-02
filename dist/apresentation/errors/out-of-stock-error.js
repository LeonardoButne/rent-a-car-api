"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutOfStockError = void 0;
class OutOfStockError extends Error {
    constructor(message) {
        super(message);
        this.name = 'OutOfStockError';
    }
}
exports.OutOfStockError = OutOfStockError;
//# sourceMappingURL=out-of-stock-error.js.map