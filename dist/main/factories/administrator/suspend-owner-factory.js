"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSuspendOwnerController = void 0;
const suspend_owner_controller_1 = require("../../../apresentation/controllers/administrator/suspend-owner-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_suspend_owner_1 = require("../../../data/usecases/administrator/db-suspend-owner");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const makeSuspendOwnerController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const dbSuspendOwner = new db_suspend_owner_1.DbSuspendOwner(adminRepository);
    const validationComposite = new validation_composite_1.ValidationComposite([]);
    return new suspend_owner_controller_1.SuspendOwnerController(validationComposite, dbSuspendOwner);
};
exports.makeSuspendOwnerController = makeSuspendOwnerController;
//# sourceMappingURL=suspend-owner-factory.js.map