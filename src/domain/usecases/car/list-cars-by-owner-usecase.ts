import { CarModel } from './create-car-usecase';

export interface ListCarsByOwnerUseCase {
  listCarsByOwner(id: string): Promise<CarModel[]>;
}