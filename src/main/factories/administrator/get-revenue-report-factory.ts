import { GetRevenueReportController } from '../../../apresentation/controllers/administrator/get-revenue-report-controller';
import { Controller } from '../../../apresentation/protocols';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbGetRevenueReport } from '../../../data/usecases/administrator/db-get-revenue-report';
import { AdministratorSequelizeAdapter } from '../../../infraestruture/database/administrator-sequelize-adapter';

export const makeGetRevenueReportController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const dbGetRevenueReport = new DbGetRevenueReport(adminRepository);
  const validationComposite = new ValidationComposite([]);
  return new GetRevenueReportController(validationComposite, dbGetRevenueReport);
}; 