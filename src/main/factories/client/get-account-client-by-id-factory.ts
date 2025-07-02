import { GetAccountClientByIdController } from '../../../apresentation/controllers/client/get-account-client-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbGetAccountClientById } from '../../../data/usecases/client/db-get-account-client-by-id';
import { ClientSequelizeAdapter } from '../../../infraestruture/database/client-sequelize-adapter';

export const makeGetAccountClientByIdController = (): Controller => {
  //1 - chamar o adapter
  const clientRepository = new ClientSequelizeAdapter();

  //2 - chamar o usecase
  const dbGetAccountClientById = new DbGetAccountClientById(clientRepository);

  //3 - validacoes

  const validations: Validation[] = []; // No specific validation needed here

  const validationComposite = new ValidationComposite(validations);

  return new GetAccountClientByIdController(validationComposite, dbGetAccountClientById);
};
