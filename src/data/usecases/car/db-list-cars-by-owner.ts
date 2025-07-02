import { ListCarsByOwnerUseCase } from '../../../domain/usecases/car/list-cars-by-owner-usecase';
import { CarRepository } from '../../repositories/car-repository';
import { CarModel } from '../../../domain/usecases/car/create-car-usecase';

export class DbListCarsByOwner implements ListCarsByOwnerUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async listCarsByOwner(ownerId: string): Promise<CarModel[]> {
    return this.carRepository.listCarsByOwner(ownerId);
  }
} 