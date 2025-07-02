"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSuspendClientController = void 0;
const suspend_client_controller_1 = require("../../../apresentation/controllers/administrator/suspend-client-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_suspend_client_1 = require("../../../data/usecases/administrator/db-suspend-client");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const makeSuspendClientController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const dbSuspendClient = new db_suspend_client_1.DbSuspendClient(adminRepository);
    const validationComposite = new validation_composite_1.ValidationComposite([]);
    return new suspend_client_controller_1.SuspendClientController(validationComposite, dbSuspendClient);
};
exports.makeSuspendClientController = makeSuspendClientController;
//# sourceMappingURL=suspend-client-factory.js.map