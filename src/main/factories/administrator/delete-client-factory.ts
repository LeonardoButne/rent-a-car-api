import { DeleteClientController } from '../../../apresentation/controllers/administrator/delete-client-controller';
import { Controller } from '../../../apresentation/protocols';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbDeleteClient } from '../../../data/usecases/administrator/db-delete-client';
import { AdministratorSequelizeAdapter } from '../../../infraestruture/database/administrator-sequelize-adapter';

export const makeDeleteClientController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const dbDeleteClient = new DbDeleteClient(adminRepository);
  const validationComposite = new ValidationComposite([]);
  return new DeleteClientController(validationComposite, dbDeleteClient);
}; 