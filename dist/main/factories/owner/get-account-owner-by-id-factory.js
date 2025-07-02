"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetAccountOwnerByIdController = void 0;
const get_account_owner_controller_1 = require("../../../apresentation/controllers/owner/get-account-owner-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_get_account_owner_by_id_1 = require("../../../data/usecases/owner/db-get-account-owner-by-id");
const owner_sequelize_adapter_1 = require("../../../infraestruture/database/owner-sequelize-adapter");
const makeGetAccountOwnerByIdController = () => {
    //1 - chamar o adapter
    const ownerRepository = new owner_sequelize_adapter_1.OwnerSequelizeAdapter();
    //2 - chamar o usecase
    const dbGetAccountOwnerById = new db_get_account_owner_by_id_1.DbGetAccountOwnerById(ownerRepository);
    //3 - validacoes
    const validations = []; // No specific validation needed here
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    return new get_account_owner_controller_1.GetAccountOwnerByIdController(validationComposite, dbGetAccountOwnerById);
};
exports.makeGetAccountOwnerByIdController = makeGetAccountOwnerByIdController;
//# sourceMappingURL=get-account-owner-by-id-factory.js.map