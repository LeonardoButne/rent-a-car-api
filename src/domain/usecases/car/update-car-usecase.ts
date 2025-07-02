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
  
  export type UpdateCarData = Partial<Omit<CarModel, 'id' | 'createdAt' | 'updatedAt'>> & {
    images?: Express.Multer.File[];
  };
  
  export interface UpdateCar {
    update(carId: string, data: UpdateCarData, ownerId: string): Promise<CarModel>;
  }
  