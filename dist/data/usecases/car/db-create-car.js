"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbCreateCar = void 0;
class DbCreateCar {
    carRepository;
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    async add(data) {
        return this.carRepository.add(data);
    }
}
exports.DbCreateCar = DbCreateCar;
//# sourceMappingURL=db-create-car.js.map