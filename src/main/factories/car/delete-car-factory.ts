import { DeleteCarController } from '../../../apresentation/controllers/car/delete-car-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbDeleteCar } from '../../../data/usecases/car/db-delete-car';
import { CarSequelizeAdapter } from '../../../infraestruture/database/car-sequelize-adapter';

export const makeDeleteCarController = (): Controller => {
  const validations: Validation[] = [];
  const validationComposite = new ValidationComposite(validations);
  const carRepository = new CarSequelizeAdapter();
  const deleteCar = new DbDeleteCar(carRepository);
  return new DeleteCarController(validationComposite, deleteCar);
}; 