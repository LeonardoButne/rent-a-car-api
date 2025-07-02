import { CarAttributes } from '../../models/car';
import { CarModel } from './create-car-usecase';

export interface GetCarByIdUseCase {
  getCarById(id: string): Promise<CarModel>;
}