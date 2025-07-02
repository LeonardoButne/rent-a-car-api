"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateCarController = void 0;
const update_car_controller_1 = require("../../../apresentation/controllers/car/update-car-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_update_car_1 = require("../../../data/usecases/car/db-update-car");
const car_sequelize_adapter_1 = require("../../../infraestruture/database/car-sequelize-adapter");
const makeUpdateCarController = () => {
    const validations = [];
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    const carRepository = new car_sequelize_adapter_1.CarSequelizeAdapter();
    const updateCar = new db_update_car_1.DbUpdateCar(carRepository);
    return new update_car_controller_1.UpdateCarController(validationComposite, updateCar);
};
exports.makeUpdateCarController = makeUpdateCarController;
//# sourceMappingURL=update-car-factory.js.map