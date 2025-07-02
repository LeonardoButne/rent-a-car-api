import { SearchCars, CarSearchFilters } from '../../../domain/usecases/car/search-cars-usecase';
import { CarRepository } from '../../repositories/car-repository';
import { CarModel } from '../../../domain/usecases/car/create-car-usecase';

export class DbSearchCars implements SearchCars {
  constructor(private readonly carRepository: CarRepository) {}

  async search(filters: CarSearchFilters): Promise<CarModel[]> {
    return this.carRepository.search(filters);
  }
} 