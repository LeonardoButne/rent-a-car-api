import { CarModel, CarWithoutId } from "../../domain/usecases/car/create-car-usecase";
import { CarSearchFilters } from "../../domain/usecases/car/search-cars-usecase";


export interface CarRepository {
  add(data: CarWithoutId): Promise<CarModel>;
  update(id: string, data: Partial<CarWithoutId>, ownerId: string): Promise<CarModel>;
  delete(id: string): Promise<void>;
  getCarById(id: string): Promise<CarModel | null>;
  listCarsByOwner(ownerId: string): Promise<CarModel[]>;
  listAllCars(): Promise<CarModel[]>;
  search(filters: CarSearchFilters): Promise<CarModel[]>;
} 