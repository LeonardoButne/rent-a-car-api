import sequelizeConnection from '../../config/config';
import { DataTypes, Model, type Optional } from 'sequelize';

export interface OwnerAttributes {
  id: string;
  name: string;
  lastName: string;
  telephone: string;
  email: string;
  password: string;
  typeAccount?: string;
  statusAccount?: boolean;
  address?: string;
  subscriptionPackage?: string;
  packageExpiresAt?: Date;
  secretKey?: string;
  isSuspended?: boolean;
}

export interface OwnerInput extends Optional<OwnerAttributes, 'id'> {}
export interface OwnerOutput extends Required<OwnerAttributes> {}

export class Owner extends Model<OwnerAttributes, OwnerInput> implements OwnerAttributes {
  declare id: string;
  declare name: string;
  declare lastName: string;
  declare telephone: string;
  declare email: string;
  declare password: string;
  declare typeAccount: string;
  declare statusAccount: boolean;
  declare address?: string;
  declare subscriptionPackage?: string;
  declare packageExpiresAt?: Date;
  declare secretKey: string;
  declare isSuspended: boolean;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Owner.init(
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
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      defaultValue: 'owner',
    },
    statusAccount: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subscriptionPackage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    packageExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    secretKey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '#',
    },
    isSuspended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    tableName: 'owners',
  },
);
