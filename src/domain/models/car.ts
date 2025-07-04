import sequelizeConnection from '../../config/config';
import { DataTypes, Model, type Optional } from 'sequelize';
import { CarImage } from './carImage';
import { Owner } from './owner';

export interface CarAttributes {
  id: string;
  ownerId: string;
  marca: string;
  modelo: string;
  ano: number;
  precoPorDia: number;
  precoPorSemana: number;
  precoPorMes: number;
  classe: string;
  categorias: string;
  descricao: string;
  cor: string;
  combustivel: string;
  quilometragem: number;
  lugares: number;
  transmissao: string;
  featured: boolean;
  disponibilidade: boolean;
  localizacao: string;
  seguro?: string;
  placa?: string;
  serviceType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CarInput extends Optional<CarAttributes, 'id'> {}
export interface CarOutput extends Required<CarAttributes> {}

export class Car extends Model<CarAttributes, CarInput> implements CarAttributes {
  declare id: string;
  declare ownerId: string;
  declare marca: string;
  declare modelo: string;
  declare ano: number;
  declare precoPorDia: number;
  declare precoPorSemana: number;
  declare precoPorMes: number;
  declare classe: string;
  declare categorias: string;
  declare descricao: string;
  declare cor: string;
  declare combustivel: string;
  declare quilometragem: number;
  declare lugares: number;
  declare transmissao: string;
  declare featured: boolean;
  declare disponibilidade: boolean;
  declare localizacao: string;
  declare seguro?: string;
  declare placa?: string;
  declare serviceType: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Car.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precoPorDia: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    precoPorSemana: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    precoPorMes: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    classe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categorias: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    combustivel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quilometragem: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lugares: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transmissao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    disponibilidade: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    localizacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seguro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    serviceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    tableName: 'cars',
  },
);

// Associação Car -> CarImage
Car.hasMany(CarImage, { foreignKey: 'carId', as: 'images' });
CarImage.belongsTo(Car, { foreignKey: 'carId', as: 'car' });
Car.belongsTo(Owner, { foreignKey: 'ownerId', as: 'owner' });
