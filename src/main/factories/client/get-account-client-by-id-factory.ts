import { GetAccountClientByIdController } from '../../../apresentation/controllers/user/get-account-client/get-account-client-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbGetAccountClientById } from '../../../data/usecases/user/db-get-account-client-by-id';
import { ClientSequelizeAdapter } from '../../../infraestruture/database/user-sequelize-adpter';

export const makeGetAccountClientByIdController = (): Controller => {
  //1 - chamar o adapter
  const clientRepository = new ClientSequelizeAdapter();

  //2 - chamar o usecase
  const dbGetAccountClientById = new DbGetAccountClientById(clientRepository);

  //3 - validacoes

  const validations: Validation[] = [];

  for (const filed of ['id']) {
    validations.push(new RequestFieldValidation(filed));
  }

  const validationComposite = new ValidationComposite(validations);

  return new GetAccountClientByIdController(validationComposite, dbGetAccountClientById);
};
