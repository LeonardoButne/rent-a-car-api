import { ListAllCars } from '../../../domain/usecases/car/list-all-cars-usecase';
import { CarRepository } from '../../repositories/car-repository';
import { CarModel } from '../../../domain/usecases/car/create-car-usecase';

export class DbListAllCars implements ListAllCars {
  constructor(private readonly carRepository: CarRepository) {}

  async listAllCars(): Promise<CarModel[]> {
    return this.carRepository.listAllCars();
  }
} 