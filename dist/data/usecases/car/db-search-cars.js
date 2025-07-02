"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSearchCars = void 0;
class DbSearchCars {
    carRepository;
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    async search(filters) {
        return this.carRepository.search(filters);
    }
}
exports.DbSearchCars = DbSearchCars;
//# sourceMappingURL=db-search-cars.js.map