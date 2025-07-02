"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteClientController = void 0;
const delete_client_controller_1 = require("../../../apresentation/controllers/administrator/delete-client-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_delete_client_1 = require("../../../data/usecases/administrator/db-delete-client");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const makeDeleteClientController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const dbDeleteClient = new db_delete_client_1.DbDeleteClient(adminRepository);
    const validationComposite = new validation_composite_1.ValidationComposite([]);
    return new delete_client_controller_1.DeleteClientController(validationComposite, dbDeleteClient);
};
exports.makeDeleteClientController = makeDeleteClientController;
//# sourceMappingURL=delete-client-factory.js.map