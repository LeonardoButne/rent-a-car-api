"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteCarController = void 0;
const delete_car_controller_1 = require("../../../apresentation/controllers/car/delete-car-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_delete_car_1 = require("../../../data/usecases/car/db-delete-car");
const car_sequelize_adapter_1 = require("../../../infraestruture/database/car-sequelize-adapter");
const makeDeleteCarController = () => {
    const validations = [];
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    const carRepository = new car_sequelize_adapter_1.CarSequelizeAdapter();
    const deleteCar = new db_delete_car_1.DbDeleteCar(carRepository);
    return new delete_car_controller_1.DeleteCarController(validationComposite, deleteCar);
};
exports.makeDeleteCarController = makeDeleteCarController;
//# sourceMappingURL=delete-car-factory.js.map