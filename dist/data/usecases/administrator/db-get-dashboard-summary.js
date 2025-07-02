"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbGetDashboardSummary = void 0;
class DbGetDashboardSummary {
    dashboardSummaryRepository;
    constructor(dashboardSummaryRepository) {
        this.dashboardSummaryRepository = dashboardSummaryRepository;
    }
    async getSummary() {
        return this.dashboardSummaryRepository.getSummary();
    }
}
exports.DbGetDashboardSummary = DbGetDashboardSummary;
//# sourceMappingURL=db-get-dashboard-summary.js.map