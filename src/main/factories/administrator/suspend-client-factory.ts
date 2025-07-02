import { SuspendClientController } from '../../../apresentation/controllers/administrator/suspend-client-controller';
import { Controller } from '../../../apresentation/protocols';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbSuspendClient } from '../../../data/usecases/administrator/db-suspend-client';
import { AdministratorSequelizeAdapter } from '../../../infraestruture/database/administrator-sequelize-adapter';

export const makeSuspendClientController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const dbSuspendClient = new DbSuspendClient(adminRepository);
  const validationComposite = new ValidationComposite([]);
  return new SuspendClientController(validationComposite, dbSuspendClient);
}; 