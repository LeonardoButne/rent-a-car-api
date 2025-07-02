"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetDashboardSummaryController = void 0;
const get_dashboard_summary_controller_1 = require("../../../apresentation/controllers/administrator/get-dashboard-summary-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_get_dashboard_summary_1 = require("../../../data/usecases/administrator/db-get-dashboard-summary");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const makeGetDashboardSummaryController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const dbGetDashboardSummary = new db_get_dashboard_summary_1.DbGetDashboardSummary(adminRepository);
    const validationComposite = new validation_composite_1.ValidationComposite([]);
    return new get_dashboard_summary_controller_1.GetDashboardSummaryController(validationComposite, dbGetDashboardSummary);
};
exports.makeGetDashboardSummaryController = makeGetDashboardSummaryController;
//# sourceMappingURL=get-dashboard-summary-factory.js.map