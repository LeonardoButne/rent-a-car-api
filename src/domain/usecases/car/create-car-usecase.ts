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
  
  export interface CreateCar {
    add(data: CarWithoutId): Promise<CarModel>;
  }
  