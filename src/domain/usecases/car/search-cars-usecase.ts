import { CarModel } from './create-car-usecase';

export interface CarSearchFilters {
    ownerId?: string;
    marca?: string;
    modelo?: string;
    anoMin?: number;
    anoMax?: number;
    precoPorDiaMin?: number;
    precoPorDiaMax?: number;
    classe?: string;
    categorias?: string;
    cor?: string;
    combustivel?: string;
    quilometragemMax?: number;
    lugares?: number;
    transmissao?: string;
    featured?: boolean;
    disponibilidade?: boolean;
    localizacao?: string;
    seguro?: string;
    placa?: string;
    // outros filtros que quiser
  }

  
export interface SearchCars {
    search(filters: CarSearchFilters): Promise<CarModel[]>;
}
