import { GetCarByIdUseCase } from '../../../domain/usecases/car/get-car-by-id-usecase';
import { CarRepository } from '../../repositories/car-repository';
import { CarModel } from '../../../domain/usecases/car/create-car-usecase';

export class DbGetCarById implements GetCarByIdUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async getCarById(id: string): Promise<CarModel | null> {
    return this.carRepository.getCarById(id);
  }
} 