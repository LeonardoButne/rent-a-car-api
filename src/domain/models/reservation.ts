import sequelizeConnection from '../../config/config';
import { DataTypes, Model, Optional } from 'sequelize';
import { Client } from './client';
import { Owner } from './owner';
import { Car } from './car';

export interface ReservationAttributes {
  id: string;
  carId: string;
  clientId: string;
  ownerId: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'active' | 'completed';
  price: number;
  notes?: string;
}

export interface ReservationInput extends Optional<ReservationAttributes, 'id'> {}
export interface ReservationOutput extends Required<ReservationAttributes> {}

export class Reservation extends Model<ReservationAttributes, ReservationInput> implements ReservationAttributes {
  declare id: string;
  declare carId: string;
  declare clientId: string;
  declare ownerId: string;
  declare startDate: Date;
  declare endDate: Date;
  declare status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'active' | 'completed';
  declare price: number;
  declare notes?: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Reservation.init(
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
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'cancelled', 'active', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    tableName: 'reservations',
  },
);

Reservation.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
Reservation.belongsTo(Owner, { foreignKey: 'ownerId', as: 'owner' });
Reservation.belongsTo(Car, { foreignKey: 'carId', as: 'car' }); 