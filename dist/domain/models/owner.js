"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Owner = void 0;
const config_1 = __importDefault(require("../../config/config"));
const sequelize_1 = require("sequelize");
class Owner extends sequelize_1.Model {
}
exports.Owner = Owner;
Owner.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    telephone: {
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
        defaultValue: 'owner',
    },
    statusAccount: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    subscriptionPackage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    packageExpiresAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    secretKey: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: '#',
    },
    isSuspended: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: true,
    sequelize: config_1.default,
    paranoid: true,
    tableName: 'owners',
});
//# sourceMappingURL=owner.js.map