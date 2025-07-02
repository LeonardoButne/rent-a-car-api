import { UpdateSubscriptionController } from '../../../apresentation/controllers/administrator/update-subscription-controller';
import { Controller } from '../../../apresentation/protocols';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbUpdateSubscription } from '../../../data/usecases/administrator/db-update-subscription';
import { AdministratorSequelizeAdapter } from '../../../infraestruture/database/administrator-sequelize-adapter';

export const makeUpdateSubscriptionController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const dbUpdateSubscription = new DbUpdateSubscription(adminRepository);
  const validations = [new RequestFieldValidation('ownerId')];
  const validationComposite = new ValidationComposite(validations);
  return new UpdateSubscriptionController(validationComposite, dbUpdateSubscription);
}; 