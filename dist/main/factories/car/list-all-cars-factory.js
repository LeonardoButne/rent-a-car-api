"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeListAllCarsController = void 0;
const list_all_cars_controller_1 = require("../../../apresentation/controllers/car/list-all-cars-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_list_all_cars_1 = require("../../../data/usecases/car/db-list-all-cars");
const car_sequelize_adapter_1 = require("../../../infraestruture/database/car-sequelize-adapter");
const makeListAllCarsController = () => {
    const validations = [];
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    const carRepository = new car_sequelize_adapter_1.CarSequelizeAdapter();
    const listAllCars = new db_list_all_cars_1.DbListAllCars(carRepository);
    return new list_all_cars_controller_1.ListAllCarsController(validationComposite, listAllCars);
};
exports.makeListAllCarsController = makeListAllCarsController;
//# sourceMappingURL=list-all-cars-factory.js.map