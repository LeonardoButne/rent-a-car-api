import { DeleteOwnerController } from '../../../apresentation/controllers/administrator/delete-owner-controller';
import { Controller } from '../../../apresentation/protocols';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbDeleteOwner } from '../../../data/usecases/administrator/db-delete-owner';
import { AdministratorSequelizeAdapter } from '../../../infraestruture/database/administrator-sequelize-adapter';

export const makeDeleteOwnerController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const dbDeleteOwner = new DbDeleteOwner(adminRepository);
  const validationComposite = new ValidationComposite([]);
  return new DeleteOwnerController(validationComposite, dbDeleteOwner);
}; 