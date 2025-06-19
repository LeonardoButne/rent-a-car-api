/* eslint-disable @typescript-eslint/no-empty-object-type */
import sequelizeConnection from '../../config/config';
import { DataTypes, Model, type Optional } from 'sequelize';

export interface ClientAttributes {
  id: string;
  name: string;
  lastName: string;
  telephone: string;
  email: string;
  password: string;
  typeAccount?: string;
  statusAccount?: boolean;
  secretKey?: string;
}

export interface ClientInput extends Optional<ClientAttributes, 'id'> {}
export interface ClientOutput extends Required<ClientAttributes> {}

export class Client extends Model<ClientAttributes, ClientInput> implements ClientAttributes {
  declare id: string;
  declare name: string;
  declare lastName: string;
  declare telephone: string;
  declare email: string;
  declare password: string;
  declare typeAccount: string;
  declare statusAccount: boolean;
  declare secretKey: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Client.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeAccount: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'client',
    },
    statusAccount: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    secretKey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '#',
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    tableName: 'user',
  },
); 