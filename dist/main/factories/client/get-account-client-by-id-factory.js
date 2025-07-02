"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetAccountClientByIdController = void 0;
const get_account_client_controller_1 = require("../../../apresentation/controllers/client/get-account-client-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_get_account_client_by_id_1 = require("../../../data/usecases/user/db-get-account-client-by-id");
const user_sequelize_adapter_1 = require("../../../infraestruture/database/user-sequelize-adapter");
const makeGetAccountClientByIdController = () => {
    //1 - chamar o adapter
    const clientRepository = new user_sequelize_adapter_1.ClientSequelizeAdapter();
    //2 - chamar o usecase
    const dbGetAccountClientById = new db_get_account_client_by_id_1.DbGetAccountClientById(clientRepository);
    //3 - validacoes
    const validations = []; // No specific validation needed here
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    return new get_account_client_controller_1.GetAccountClientByIdController(validationComposite, dbGetAccountClientById);
};
exports.makeGetAccountClientByIdController = makeGetAccountClientByIdController;
//# sourceMappingURL=get-account-client-by-id-factory.js.map