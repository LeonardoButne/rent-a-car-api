"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbGetCarById = void 0;
class DbGetCarById {
    carRepository;
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    async getCarById(id) {
        return this.carRepository.getCarById(id);
    }
}
exports.DbGetCarById = DbGetCarById;
//# sourceMappingURL=db-get-car-by-id.js.map