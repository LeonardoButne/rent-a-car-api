"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateCarController = void 0;
const create_car_controller_1 = require("../../../apresentation/controllers/car/create-car-controller");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_create_car_1 = require("../../../data/usecases/car/db-create-car");
const car_sequelize_adapter_1 = require("../../../infraestruture/database/car-sequelize-adapter");
const makeCreateCarController = () => {
    const carRepository = new car_sequelize_adapter_1.CarSequelizeAdapter();
    const validations = [];
    for (const field of [
        'marca', 'modelo', 'ano', 'precoPorDia', 'precoPorSemana', 'precoPorMes',
        'classe', 'quilometragem', 'lugares', 'transmissao', 'localizacao'
    ]) {
        validations.push(new request_field_validation_1.RequestFieldValidation(field));
    }
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    const createCar = new db_create_car_1.DbCreateCar(carRepository);
    return new create_car_controller_1.CreateCarController(validationComposite, createCar);
};
exports.makeCreateCarController = makeCreateCarController;
//# sourceMappingURL=create-car-factory.js.map