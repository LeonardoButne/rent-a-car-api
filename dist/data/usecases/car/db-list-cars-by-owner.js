"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbListCarsByOwner = void 0;
class DbListCarsByOwner {
    carRepository;
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    async listCarsByOwner(ownerId) {
        return this.carRepository.listCarsByOwner(ownerId);
    }
}
exports.DbListCarsByOwner = DbListCarsByOwner;
//# sourceMappingURL=db-list-cars-by-owner.js.map