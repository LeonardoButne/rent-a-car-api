"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeListOwnersController = void 0;
const list_owners_controller_1 = require("../../../apresentation/controllers/administrator/list-owners-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_list_owners_1 = require("../../../data/usecases/administrator/db-list-owners");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const makeListOwnersController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const dbListOwners = new db_list_owners_1.DbListOwners(adminRepository);
    const validationComposite = new validation_composite_1.ValidationComposite([]);
    return new list_owners_controller_1.ListOwnersController(validationComposite, dbListOwners);
};
exports.makeListOwnersController = makeListOwnersController;
//# sourceMappingURL=list-owners-factory.js.map