"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetSubscriptionByOwnerController = void 0;
const get_subscription_by_owner_controller_1 = require("../../../apresentation/controllers/administrator/get-subscription-by-owner-controller");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_get_subscription_by_owner_1 = require("../../../data/usecases/administrator/db-get-subscription-by-owner");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const makeGetSubscriptionByOwnerController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const dbGetSubscriptionByOwner = new db_get_subscription_by_owner_1.DbGetSubscriptionByOwner(adminRepository);
    const validations = [new request_field_validation_1.RequestFieldValidation('ownerId')];
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    return new get_subscription_by_owner_controller_1.GetSubscriptionByOwnerController(validationComposite, dbGetSubscriptionByOwner);
};
exports.makeGetSubscriptionByOwnerController = makeGetSubscriptionByOwnerController;
//# sourceMappingURL=get-subscription-by-owner-factory.js.map