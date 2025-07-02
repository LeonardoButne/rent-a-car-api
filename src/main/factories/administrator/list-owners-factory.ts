import { ListOwnersController } from '../../../apresentation/controllers/administrator/list-owners-controller';
import { Controller } from '../../../apresentation/protocols';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbListOwners } from '../../../data/usecases/administrator/db-list-owners';
import { AdministratorSequelizeAdapter } from '../../../infraestruture/database/administrator-sequelize-adapter';

export const makeListOwnersController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const dbListOwners = new DbListOwners(adminRepository);
  const validationComposite = new ValidationComposite([]);
  return new ListOwnersController(validationComposite, dbListOwners);
}; 