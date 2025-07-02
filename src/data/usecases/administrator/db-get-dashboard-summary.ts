import { GetDashboardSummary, DashboardSummary } from '../../../domain/usecases/administrator-usecases/get-dashboard-summary-usecase';
import { AdministratorRepository } from '../../repositories/administrator-repository';

export class DbGetDashboardSummary implements GetDashboardSummary {
    constructor(private readonly dashboardSummaryRepository: AdministratorRepository) {}
    async getSummary(): Promise<DashboardSummary> {
        return this.dashboardSummaryRepository.getSummary();
    }
} 