import { ListCarsByOwnerController } from '../../../apresentation/controllers/car/list-cars-by-owner-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbListCarsByOwner } from '../../../data/usecases/car/db-list-cars-by-owner';
import { CarSequelizeAdapter } from '../../../infraestruture/database/car-sequelize-adapter';

export const makeListCarsByOwnerController = (): Controller => {
  const validations: Validation[] = [];
  const validationComposite = new ValidationComposite(validations);
  const carRepository = new CarSequelizeAdapter();
  const listCarsByOwner = new DbListCarsByOwner(carRepository);
  return new ListCarsByOwnerController(validationComposite, listCarsByOwner);
}; 