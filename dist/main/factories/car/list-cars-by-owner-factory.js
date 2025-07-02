"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeListCarsByOwnerController = void 0;
const list_cars_by_owner_controller_1 = require("../../../apresentation/controllers/car/list-cars-by-owner-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_list_cars_by_owner_1 = require("../../../data/usecases/car/db-list-cars-by-owner");
const car_sequelize_adapter_1 = require("../../../infraestruture/database/car-sequelize-adapter");
const makeListCarsByOwnerController = () => {
    const validations = [];
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    const carRepository = new car_sequelize_adapter_1.CarSequelizeAdapter();
    const listCarsByOwner = new db_list_cars_by_owner_1.DbListCarsByOwner(carRepository);
    return new list_cars_by_owner_controller_1.ListCarsByOwnerController(validationComposite, listCarsByOwner);
};
exports.makeListCarsByOwnerController = makeListCarsByOwnerController;
//# sourceMappingURL=list-cars-by-owner-factory.js.map