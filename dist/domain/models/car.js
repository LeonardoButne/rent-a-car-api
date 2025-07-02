"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const config_1 = __importDefault(require("../../config/config"));
const sequelize_1 = require("sequelize");
const carImage_1 = require("./carImage");
class Car extends sequelize_1.Model {
}
exports.Car = Car;
Car.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    ownerId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    marca: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    modelo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ano: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    precoPorDia: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    precoPorSemana: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    precoPorMes: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    classe: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    categorias: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    descricao: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    cor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    combustivel: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    quilometragem: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    lugares: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    transmissao: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    featured: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    disponibilidade: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    localizacao: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    seguro: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    placa: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
}, {
    timestamps: true,
    sequelize: config_1.default,
    paranoid: true,
    tableName: 'cars',
});
// Associação Car -> CarImage
Car.hasMany(carImage_1.CarImage, { foreignKey: 'carId', as: 'images' });
carImage_1.CarImage.belongsTo(Car, { foreignKey: 'carId', as: 'car' });
//# sourceMappingURL=car.js.map