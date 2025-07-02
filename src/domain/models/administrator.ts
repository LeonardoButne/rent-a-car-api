import { DataTypes, Model, type Optional } from 'sequelize'
import sequelizeConnection from '../../config/config'

export interface AdministradorAttributes {
    id: string
    userName: string
    email: string
    password: string
    typeAccount?: string
    statusAccount?: boolean
    isSuspended?: boolean
    secretKey?: string
}

export interface AdministradorInput
    extends Optional<AdministradorAttributes, 'id'> {}
export interface AdministradorOutput
    extends Required<AdministradorAttributes> {}

export class Administrador
    extends Model<AdministradorAttributes, AdministradorInput>
    implements AdministradorAttributes
{
    declare id: string
    declare userName: string
    declare email: string
    declare password: string
    declare typeAccount: string
    declare statusAccount: boolean
    declare isSuspended: boolean;
    declare secretKey: string
    declare readonly createdAt?: Date
    declare readonly updatedAt?: Date
}

Administrador.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userName: {
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
            defaultValue: 'admin',
        },
        statusAccount: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isSuspended: {
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
        tableName: 'Administrador',
    },
)