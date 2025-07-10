import sequelizeConnection from '../../config/config';
import { DataTypes, Model, Optional } from 'sequelize';

export interface NotificationAttributes {
  id: string;
  userId: string;
  type: 'reservation_request' | 'reservation_approved' | 'reservation_rejected';
  title: string;
  message: string;
  reservationId: string;
  isRead: boolean;
  deviceToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NotificationInput extends Optional<NotificationAttributes, 'id' | 'isRead' | 'deviceToken'> {}
export interface NotificationOutput extends Required<NotificationAttributes> {}

export class Notification extends Model<NotificationAttributes, NotificationInput> implements NotificationAttributes {
  declare id: string;
  declare userId: string;
  declare type: 'reservation_request' | 'reservation_approved' | 'reservation_rejected';
  declare title: string;
  declare message: string;
  declare reservationId: string;
  declare isRead: boolean;
  declare deviceToken?: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Notification.init(
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
    type: {
      type: DataTypes.ENUM('reservation_request', 'reservation_approved', 'reservation_rejected'),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reservationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    deviceToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'notifications',
  },
); 