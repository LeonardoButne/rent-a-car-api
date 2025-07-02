"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeListClientsController = void 0;
const list_clients_controller_1 = require("../../../apresentation/controllers/administrator/list-clients-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_list_clients_1 = require("../../../data/usecases/administrator/db-list-clients");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const makeListClientsController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const dbListClients = new db_list_clients_1.DbListClients(adminRepository);
    const validationComposite = new validation_composite_1.ValidationComposite([]);
    return new list_clients_controller_1.ListClientsController(validationComposite, dbListClients);
};
exports.makeListClientsController = makeListClientsController;
//# sourceMappingURL=list-clients-factory.js.map