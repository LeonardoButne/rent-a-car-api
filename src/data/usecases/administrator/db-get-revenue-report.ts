import { GetRevenueReport, RevenueReport } from '../../../domain/usecases/administrator-usecases/get-revenue-report-usecase';
import { AdministratorRepository } from '../../repositories/administrator-repository';

export class DbGetRevenueReport implements GetRevenueReport {
    constructor(private readonly revenueReportRepository: AdministratorRepository) {}
    async getRevenueReport(): Promise<RevenueReport> {
        return this.revenueReportRepository.getRevenueReport();
    }
}