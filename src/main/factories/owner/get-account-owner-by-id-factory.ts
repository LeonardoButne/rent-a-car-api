import { GetAccountOwnerByIdController } from '../../../apresentation/controllers/owner/get-account-owner-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbGetAccountOwnerById } from '../../../data/usecases/owner/db-get-account-owner-by-id';
import { OwnerSequelizeAdapter } from '../../../infraestruture/database/owner-sequelize-adapter';

export const makeGetAccountOwnerByIdController = (): Controller => {
  //1 - chamar o adapter
  const ownerRepository = new OwnerSequelizeAdapter();

  //2 - chamar o usecase
  const dbGetAccountOwnerById = new DbGetAccountOwnerById(ownerRepository);

  //3 - validacoes

  const validations: Validation[] = []; // No specific validation needed here

  const validationComposite = new ValidationComposite(validations);

  return new GetAccountOwnerByIdController(validationComposite, dbGetAccountOwnerById);
}; 