"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateSubscriptionController = void 0;
const update_subscription_controller_1 = require("../../../apresentation/controllers/administrator/update-subscription-controller");
const request_field_validation_1 = require("../../../apresentation/validations/request-field-validation");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_update_subscription_1 = require("../../../data/usecases/administrator/db-update-subscription");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const makeUpdateSubscriptionController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const dbUpdateSubscription = new db_update_subscription_1.DbUpdateSubscription(adminRepository);
    const validations = [new request_field_validation_1.RequestFieldValidation('ownerId')];
    const validationComposite = new validation_composite_1.ValidationComposite(validations);
    return new update_subscription_controller_1.UpdateSubscriptionController(validationComposite, dbUpdateSubscription);
};
exports.makeUpdateSubscriptionController = makeUpdateSubscriptionController;
//# sourceMappingURL=update-subscription-factory.js.map