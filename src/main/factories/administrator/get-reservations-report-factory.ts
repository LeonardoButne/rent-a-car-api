import { GetReservationsReportController } from '../../../apresentation/controllers/administrator/get-reservations-report-controller';
import { Controller } from '../../../apresentation/protocols';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbGetReservationsReport } from '../../../data/usecases/administrator/db-get-reservations-report';
import { AdministratorSequelizeAdapter } from '../../../infraestruture/database/administrator-sequelize-adapter';

export const makeGetReservationsReportController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const dbGetReservationsReport = new DbGetReservationsReport(adminRepository);
  const validationComposite = new ValidationComposite([]);
  return new GetReservationsReportController(validationComposite, dbGetReservationsReport);
}; 