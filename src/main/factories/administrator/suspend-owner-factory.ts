import { SuspendOwnerController } from '../../../apresentation/controllers/administrator/suspend-owner-controller';
import { Controller } from '../../../apresentation/protocols';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbSuspendOwner } from '../../../data/usecases/administrator/db-suspend-owner';
import { AdministratorSequelizeAdapter } from '../../../infraestruture/database/administrator-sequelize-adapter';

export const makeSuspendOwnerController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const dbSuspendOwner = new DbSuspendOwner(adminRepository);
  const validationComposite = new ValidationComposite([]);
  return new SuspendOwnerController(validationComposite, dbSuspendOwner);
}; 