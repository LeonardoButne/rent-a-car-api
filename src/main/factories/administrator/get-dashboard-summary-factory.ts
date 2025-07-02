import { GetDashboardSummaryController } from '../../../apresentation/controllers/administrator/get-dashboard-summary-controller';
import { Controller } from '../../../apresentation/protocols';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbGetDashboardSummary } from '../../../data/usecases/administrator/db-get-dashboard-summary';
import { AdministratorSequelizeAdapter } from '../../../infraestruture/database/administrator-sequelize-adapter';

export const makeGetDashboardSummaryController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const dbGetDashboardSummary = new DbGetDashboardSummary(adminRepository);
  const validationComposite = new ValidationComposite([]);
  return new GetDashboardSummaryController(validationComposite, dbGetDashboardSummary);
}; 