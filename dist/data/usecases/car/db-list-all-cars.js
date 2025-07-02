"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbListAllCars = void 0;
class DbListAllCars {
    carRepository;
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    async listAllCars() {
        return this.carRepository.listAllCars();
    }
}
exports.DbListAllCars = DbListAllCars;
//# sourceMappingURL=db-list-all-cars.js.map