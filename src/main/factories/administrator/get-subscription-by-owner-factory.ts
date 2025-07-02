import { GetSubscriptionByOwnerController } from '../../../apresentation/controllers/administrator/get-subscription-by-owner-controller';
import { Controller } from '../../../apresentation/protocols';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbGetSubscriptionByOwner } from '../../../data/usecases/administrator/db-get-subscription-by-owner';
import { AdministratorSequelizeAdapter } from '../../../infraestruture/database/administrator-sequelize-adapter';

export const makeGetSubscriptionByOwnerController = (): Controller => {
  const adminRepository = new AdministratorSequelizeAdapter();
  const dbGetSubscriptionByOwner = new DbGetSubscriptionByOwner(adminRepository);
  const validations = [new RequestFieldValidation('ownerId')];
  const validationComposite = new ValidationComposite(validations);
  return new GetSubscriptionByOwnerController(validationComposite, dbGetSubscriptionByOwner);
}; 