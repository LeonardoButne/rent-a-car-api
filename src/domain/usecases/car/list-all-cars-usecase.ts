import { CarModel } from './create-car-usecase';

export interface ListAllCars {
    listAllCars(): Promise<CarModel[]>;
}  