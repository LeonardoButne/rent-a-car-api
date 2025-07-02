"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetCarByIdController = void 0;
const get_car_by_id_controller_1 = require("../../../apresentation/controllers/car/get-car-by-id-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_get_car_by_id_1 = require("../../../data/usecases/car/db-get-car-by-id");
const car_sequelize_adapter_1 = require("../../../infraestruture/database/car-sequelize-adapter");
const makeGetCarByIdController = () => {
    const validations = [];
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    const carRepository = new car_sequelize_adapter_1.CarSequelizeAdapter();
    const getCarById = new db_get_car_by_id_1.DbGetCarById(carRepository);
    return new get_car_by_id_controller_1.GetCarByIdController(validationComposite, getCarById);
};
exports.makeGetCarByIdController = makeGetCarByIdController;
//# sourceMappingURL=get-car-by-id-factory.js.map