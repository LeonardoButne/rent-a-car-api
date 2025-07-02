"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbGetReservationsReport = void 0;
class DbGetReservationsReport {
    reservationsReportRepository;
    constructor(reservationsReportRepository) {
        this.reservationsReportRepository = reservationsReportRepository;
    }
    async getReservationsReport() {
        return this.reservationsReportRepository.getReservationsReport();
    }
}
exports.DbGetReservationsReport = DbGetReservationsReport;
//# sourceMappingURL=db-get-reservations-report.js.map