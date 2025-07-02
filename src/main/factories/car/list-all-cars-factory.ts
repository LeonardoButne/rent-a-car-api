import { ListAllCarsController } from '../../../apresentation/controllers/car/list-all-cars-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbListAllCars } from '../../../data/usecases/car/db-list-all-cars';
import { CarSequelizeAdapter } from '../../../infraestruture/database/car-sequelize-adapter';

export const makeListAllCarsController = (): Controller => {
  const validations: Validation[] = [];
  const validationComposite = new ValidationComposite(validations);
  const carRepository = new CarSequelizeAdapter();
  const listAllCars = new DbListAllCars(carRepository);
  return new ListAllCarsController(validationComposite, listAllCars);
}; 