import sequelizeConnection from '../../config/config';
import { DataTypes, Model, type Optional } from 'sequelize';
import { url } from '../../config/appConfig';

export interface CarImageAttributes {
  id: string;
  carId: string;
  fileName: string;
  originalName: string;
  createdAt?: Date;
  updatedAt?: Date;
  url?: string; // virtual
}

export interface CarImageInput extends Optional<CarImageAttributes, 'id'> {}
export interface CarImageOutput extends Required<CarImageAttributes> {}

export class CarImage extends Model<CarImageAttributes, CarImageInput> implements CarImageAttributes {
  declare id: string;
  declare carId: string;
  declare fileName: string;
  declare originalName: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

CarImage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    carId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        const fileName = this.getDataValue('fileName');
        if (!fileName) return null;

        return `${url.url}/uploads/img/${fileName}`;
      },
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    tableName: 'carImages',
  },
);
