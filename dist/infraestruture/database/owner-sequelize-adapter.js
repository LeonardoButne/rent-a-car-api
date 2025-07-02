"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerSequelizeAdapter = void 0;
const sequelize_1 = require("sequelize");
const owner_1 = require("../../domain/models/owner");
class OwnerSequelizeAdapter {
    async add(data) {
        const addAccountOwner = await owner_1.Owner.create({
            name: data.name,
            lastName: data.lastName,
            telephone: data.telephone,
            email: data.email,
            password: data.password,
            secretKey: data.secretKey,
            address: data.address,
            subscriptionPackage: data.subscriptionPackage,
            packageExpiresAt: data.packageExpiresAt,
            typeAccount: data.typeAccount,
            statusAccount: data.statusAccount,
        });
        const ownerData = addAccountOwner.toJSON();
        delete ownerData.password;
        delete ownerData.secretKey;
        return ownerData;
    }
    async getAccountByEmail(email) {
        return await owner_1.Owner.findOne({
            where: {
                email,
            },
        });
    }
    async updateStatusAccountOwner(email) {
        const [updated] = await owner_1.Owner.update({ statusAccount: true }, {
            where: {
                email,
                statusAccount: false,
            },
        });
        return updated > 0;
    }
    async getAccount(value) {
        return await owner_1.Owner.findOne({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        email: value,
                    },
                ],
            },
        });
    }
    async getAccountById(id) {
        const account = await owner_1.Owner.findByPk(id);
        if (!account) {
            return null;
        }
        const formatAccount = account.toJSON();
        delete formatAccount.password;
        delete formatAccount.secretKey;
        return formatAccount;
    }
    async loadOwnerById(id) {
        const account = await owner_1.Owner.findByPk(id);
        if (!account) {
            return null;
        }
        const formatAccount = account.toJSON();
        delete formatAccount.password;
        delete formatAccount.secretKey;
        return formatAccount;
    }
}
exports.OwnerSequelizeAdapter = OwnerSequelizeAdapter;
//# sourceMappingURL=owner-sequelize-adapter.js.map