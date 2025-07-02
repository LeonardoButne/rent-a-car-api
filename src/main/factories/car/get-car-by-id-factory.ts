import { GetCarByIdController } from '../../../apresentation/controllers/car/get-car-by-id-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbGetCarById } from '../../../data/usecases/car/db-get-car-by-id';
import { CarSequelizeAdapter } from '../../../infraestruture/database/car-sequelize-adapter';

export const makeGetCarByIdController = (): Controller => {
  const validations: Validation[] = [];
  const validationComposite = new ValidationComposite(validations);
  const carRepository = new CarSequelizeAdapter();
  const getCarById = new DbGetCarById(carRepository);
  return new GetCarByIdController(validationComposite, getCarById);
}; 