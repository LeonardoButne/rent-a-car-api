import { CreateCarController } from '../../../apresentation/controllers/car/create-car-controller';
import { Controller } from '../../../apresentation/protocols';
import { Validation } from '../../../apresentation/protocols/validation';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { DbCreateCar } from '../../../data/usecases/car/db-create-car';
import { CarSequelizeAdapter } from '../../../infraestruture/database/car-sequelize-adapter';

export const makeCreateCarController = (): Controller => {
    const carRepository = new CarSequelizeAdapter();
  const validations: Validation[] = [];
  for (const field of [
    'marca', 'modelo', 'ano', 'precoPorDia', 'precoPorSemana', 'precoPorMes',
    'classe', 'quilometragem', 'lugares', 'transmissao', 'localizacao']) {
    validations.push(new RequestFieldValidation(field));
  }
  const validationComposite = new ValidationComposite(validations);
  
  const createCar = new DbCreateCar(carRepository);
  return new CreateCarController(validationComposite, createCar);
}; 
