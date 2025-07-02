export interface CarModel {
    id: string;
    ownerId: string;
    marca: string;
    modelo: string;
    ano: number;
    precoPorDia: number;
    precoPorSemana: number;
    precoPorMes: number;
    classe: string;
    categorias?: string;
    descricao?: string;
    cor?: string;
    combustivel?: string;
    quilometragem: number;
    lugares: number;
    transmissao: string;
    featured?: boolean;
    disponibilidade?: boolean;
    localizacao: string;
    seguro?: string;
    placa?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type CarWithoutId = Omit<CarModel, 'id' | 'createdAt' | 'updatedAt'> & {
    images?: Express.Multer.File[];
  };
  
  export interface CreateCarUseCase  {
    add(data: CarWithoutId): Promise<CarModel>;
  }
  
  export interface DeleteCarUseCase  {
    delete(id: string): Promise<void>;
  }
  
  export interface GetCarByIdUseCase {
    getCarById(id: string): Promise<CarModel>;
  }

  export interface ListAllCarsUseCase  {
    listAllCars(): Promise<CarModel[]>;
}  

export interface ListCarsByOwnerUseCase {
    listCarsByOwner(id: string): Promise<CarModel[]>;
  }

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

  
export interface SearchCarsUseCase  {
    search(filters: CarSearchFilters): Promise<CarModel[]>;
}

  export type UpdateCarDataUseCase  = Partial<Omit<CarModel, 'id' | 'createdAt' | 'updatedAt'>> & {
    images?: Express.Multer.File[];
  };
  
  export interface UpdateCarUseCase  {
    update(carId: string, data: UpdateCarDataUseCase , ownerId: string): Promise<CarModel>;
  }
  