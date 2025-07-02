"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeListSubscriptionsController = void 0;
const list_subscriptions_controller_1 = require("../../../apresentation/controllers/administrator/list-subscriptions-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_list_subscriptions_1 = require("../../../data/usecases/administrator/db-list-subscriptions");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const makeListSubscriptionsController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const dbListSubscriptions = new db_list_subscriptions_1.DbListSubscriptions(adminRepository);
    const validationComposite = new validation_composite_1.ValidationComposite([]);
    return new list_subscriptions_controller_1.ListSubscriptionsController(validationComposite, dbListSubscriptions);
};
exports.makeListSubscriptionsController = makeListSubscriptionsController;
//# sourceMappingURL=list-subscriptions-factory.js.map