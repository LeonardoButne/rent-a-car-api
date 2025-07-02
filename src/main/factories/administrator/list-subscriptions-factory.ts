import { ListSubscriptionsController } from '../../../apresentation/controllers/administrator/list-subscriptions-controller';
import { Controller } from '../../../apresentation/protocols';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbListSubscriptions } from '../../../data/usecases/administrator/db-list-subscriptions';
import { AdministratorSequelizeAdapter } from '../../../infraestruture/database/administrator-sequelize-adapter';

export const makeListSubscriptionsController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const dbListSubscriptions = new DbListSubscriptions(adminRepository);
  const validationComposite = new ValidationComposite([]);
  return new ListSubscriptionsController(validationComposite, dbListSubscriptions);
}; 