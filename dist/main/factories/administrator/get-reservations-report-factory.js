"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetReservationsReportController = void 0;
const get_reservations_report_controller_1 = require("../../../apresentation/controllers/administrator/get-reservations-report-controller");
const validation_composite_1 = require("../../../apresentation/validations/validation-composite");
const db_get_reservations_report_1 = require("../../../data/usecases/administrator/db-get-reservations-report");
const administrator_sequelize_adapter_1 = require("../../../infraestruture/database/administrator-sequelize-adapter");
const makeGetReservationsReportController = () => {
    const adminRepository = new administrator_sequelize_adapter_1.AdministratorSequelizeAdapter();
    const dbGetReservationsReport = new db_get_reservations_report_1.DbGetReservationsReport(adminRepository);
    const validationComposite = new validation_composite_1.ValidationComposite([]);
    return new get_reservations_report_controller_1.GetReservationsReportController(validationComposite, dbGetReservationsReport);
};
exports.makeGetReservationsReportController = makeGetReservationsReportController;
//# sourceMappingURL=get-reservations-report-factory.js.map