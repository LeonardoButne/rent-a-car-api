"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarImage = void 0;
const config_1 = __importDefault(require("../../config/config"));
const sequelize_1 = require("sequelize");
const appConfig_1 = require("../../config/appConfig");
class CarImage extends sequelize_1.Model {
}
exports.CarImage = CarImage;
CarImage.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    carId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    fileName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    originalName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: sequelize_1.DataTypes.VIRTUAL,
        get() {
            return `${appConfig_1.url.url}/img/${this.getDataValue('fileName')}`;
        },
    },
}, {
    timestamps: true,
    sequelize: config_1.default,
    paranoid: true,
    tableName: 'carImages',
});
//# sourceMappingURL=carImage.js.map