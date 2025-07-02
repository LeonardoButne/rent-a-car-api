"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteOwnerController = void 0;
const delete_owner_controller_1 = require("../../../apresentation/controllers/administrator/delete-owner-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_delete_owner_1 = require("../../../data/usecases/administrator/db-delete-owner");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const makeDeleteOwnerController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const dbDeleteOwner = new db_delete_owner_1.DbDeleteOwner(adminRepository);
    const validationComposite = new validation_composite_1.ValidationComposite([]);
    return new delete_owner_controller_1.DeleteOwnerController(validationComposite, dbDeleteOwner);
};
exports.makeDeleteOwnerController = makeDeleteOwnerController;
//# sourceMappingURL=delete-owner-factory.js.map