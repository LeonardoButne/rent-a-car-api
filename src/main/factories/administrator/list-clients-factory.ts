import { ListClientsController } from '../../../apresentation/controllers/administrator/list-clients-controller';
import { Controller } from '../../../apresentation/protocols';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbListClients } from '../../../data/usecases/administrator/db-list-clients';
import { AdministratorSequelizeAdapter } from '../../../infraestruture/database/administrator-sequelize-adapter';

export const makeListClientsController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const dbListClients = new DbListClients(adminRepository);
  const validationComposite = new ValidationComposite([]);
  return new ListClientsController(validationComposite, dbListClients);
}; 