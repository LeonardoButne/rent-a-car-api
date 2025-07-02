import { GetReservationsReport, ReservationsReport } from '../../../domain/usecases/administrator-usecases/get-reservations-report-usecase';
import { AdministratorRepository } from '../../repositories/administrator-repository';

export class DbGetReservationsReport implements GetReservationsReport {
    constructor(private readonly reservationsReportRepository: AdministratorRepository) {}
    async getReservationsReport(): Promise<ReservationsReport> {
        return this.reservationsReportRepository.getReservationsReport();
    }
} 