"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReservationsReportController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class GetReservationsReportController {
    validation;
    getReservationsReport;
    constructor(validation, getReservationsReport) {
        this.validation = validation;
        this.getReservationsReport = getReservationsReport;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return { statusCode: 400, body: error };
            }
            const report = await this.getReservationsReport.getReservationsReport();
            return (0, http_helpers_1.ok)(report);
        }
        catch (error) {
            return (0, http_helpers_1.serverError)({ error });
        }
    }
}
exports.GetReservationsReportController = GetReservationsReportController;
//# sourceMappingURL=get-reservations-report-controller.js.map