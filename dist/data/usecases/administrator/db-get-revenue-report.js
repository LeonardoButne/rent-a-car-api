"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbGetRevenueReport = void 0;
class DbGetRevenueReport {
    revenueReportRepository;
    constructor(revenueReportRepository) {
        this.revenueReportRepository = revenueReportRepository;
    }
    async getRevenueReport() {
        return this.revenueReportRepository.getRevenueReport();
    }
}
exports.DbGetRevenueReport = DbGetRevenueReport;
//# sourceMappingURL=db-get-revenue-report.js.map