"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRevenueReportController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class GetRevenueReportController {
    validation;
    getRevenueReport;
    constructor(validation, getRevenueReport) {
        this.validation = validation;
        this.getRevenueReport = getRevenueReport;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return { statusCode: 400, body: error };
            }
            const report = await this.getRevenueReport.getRevenueReport();
            return (0, http_helpers_1.ok)(report);
        }
        catch (error) {
            return (0, http_helpers_1.serverError)({ error });
        }
    }
}
exports.GetRevenueReportController = GetRevenueReportController;
//# sourceMappingURL=get-revenue-report-controller.js.map