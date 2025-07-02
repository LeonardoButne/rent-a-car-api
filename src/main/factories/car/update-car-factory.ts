import { UpdateCarController } from '../../../apresentation/controllers/car/update-car-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbUpdateCar } from '../../../data/usecases/car/db-update-car';
import { CarSequelizeAdapter } from '../../../infraestruture/database/car-sequelize-adapter';

export const makeUpdateCarController = (): Controller => {
  const validations: Validation[] = [];
  const validationComposite = new ValidationComposite(validations);
  const carRepository = new CarSequelizeAdapter();
  const updateCar = new DbUpdateCar(carRepository);
  return new UpdateCarController(validationComposite, updateCar);
}; 