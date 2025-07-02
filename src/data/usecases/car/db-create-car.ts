import { CreateCar, CarWithoutId, CarModel } from '../../../domain/usecases/car/create-car-usecase';
import { CarRepository } from '../../repositories/car-repository';

export class DbCreateCar implements CreateCar {
  constructor(private readonly carRepository: CarRepository) {}

  async add(data: CarWithoutId): Promise<CarModel> {
    return this.carRepository.add(data);
  }
} 