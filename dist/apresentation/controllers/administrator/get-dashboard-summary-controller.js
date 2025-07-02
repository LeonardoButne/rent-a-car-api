"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDashboardSummaryController = void 0;
const http_helpers_1 = require("../../helpers/http-helpers");
class GetDashboardSummaryController {
    validation;
    getDashboardSummary;
    constructor(validation, getDashboardSummary) {
        this.validation = validation;
        this.getDashboardSummary = getDashboardSummary;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest);
            if (error) {
                return { statusCode: 400, body: error };
            }
            const summary = await this.getDashboardSummary.getSummary();
            return (0, http_helpers_1.ok)(summary);
        }
        catch (error) {
            return (0, http_helpers_1.serverError)({ error });
        }
    }
}
exports.GetDashboardSummaryController = GetDashboardSummaryController;
//# sourceMappingURL=get-dashboard-summary-controller.js.map