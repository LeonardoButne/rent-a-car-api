import { UpdateCar, UpdateCarData, CarModel } from '../../../domain/usecases/car/update-car-usecase';
import { CarRepository } from '../../repositories/car-repository';

export class DbUpdateCar implements UpdateCar {
  constructor(private readonly carRepository: CarRepository) {}

  async update(id: string, data: UpdateCarData, ownerId: string): Promise<CarModel> {
    return this.carRepository.update(id, data, ownerId);
  }
} 