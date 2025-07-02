import { DeleteCar } from '../../../domain/usecases/car/delete-car-usecase';
import { CarRepository } from '../../repositories/car-repository';

export class DbDeleteCar implements DeleteCar {
  constructor(private readonly carRepository: CarRepository) {}

  async delete(id: string): Promise<void> {
    await this.carRepository.delete(id);
  }
} 