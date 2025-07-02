"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbUpdateCar = void 0;
class DbUpdateCar {
    carRepository;
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    async update(id, data, ownerId) {
        return this.carRepository.update(id, data, ownerId);
    }
}
exports.DbUpdateCar = DbUpdateCar;
//# sourceMappingURL=db-update-car.js.map