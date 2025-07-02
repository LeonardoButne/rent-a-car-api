"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarNotFoundError = void 0;
class CarNotFoundError extends Error {
    constructor() {
        super("Car not found");
        this.name = "CarNotFoundError";
    }
}
exports.CarNotFoundError = CarNotFoundError;
//# sourceMappingURL=car-not-found-error.js.map