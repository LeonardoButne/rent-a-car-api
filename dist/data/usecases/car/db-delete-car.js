"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbDeleteCar = void 0;
class DbDeleteCar {
    carRepository;
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    async delete(id) {
        await this.carRepository.delete(id);
    }
}
exports.DbDeleteCar = DbDeleteCar;
//# sourceMappingURL=db-delete-car.js.map