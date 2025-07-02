"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetRevenueReportController = void 0;
const get_revenue_report_controller_1 = require("../../../apresentation/controllers/administrator/get-revenue-report-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_get_revenue_report_1 = require("../../../data/usecases/administrator/db-get-revenue-report");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const makeGetRevenueReportController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const dbGetRevenueReport = new db_get_revenue_report_1.DbGetRevenueReport(adminRepository);
    const validationComposite = new validation_composite_1.ValidationComposite([]);
    return new get_revenue_report_controller_1.GetRevenueReportController(validationComposite, dbGetRevenueReport);
};
exports.makeGetRevenueReportController = makeGetRevenueReportController;
//# sourceMappingURL=get-revenue-report-factory.js.map