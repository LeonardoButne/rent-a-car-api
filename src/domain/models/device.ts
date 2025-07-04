import { Model, DataTypes, Optional } from 'sequelize';
import sequelizeConnection from '../../config/config';

export interface DeviceAttributes {
  id: string;
  userId: string;
  userType: 'client' | 'owner';
  deviceId: string;
  deviceName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DeviceInput extends Optional<DeviceAttributes, 'id'> {}
export interface DeviceOutput extends Required<DeviceAttributes> {}

export class Device extends Model<DeviceAttributes, DeviceInput> implements DeviceAttributes {
  declare id: string;
  declare userId: string;
  declare userType: 'client' | 'owner';
  declare deviceId: string;
  declare deviceName?: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Device.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deviceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deviceName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'devices',
  },
); 