"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administrador = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../config/config"));
class Administrador extends sequelize_1.Model {
}
exports.Administrador = Administrador;
Administrador.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    typeAccount: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'admin',
    },
    statusAccount: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isSuspended: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    secretKey: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: '#',
    },
}, {
    timestamps: true,
    sequelize: config_1.default,
    paranoid: true,
    tableName: 'Administrador',
});
//# sourceMappingURL=administrator.js.map