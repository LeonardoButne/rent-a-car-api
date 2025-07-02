"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSequelizeAdapter = void 0;
const sequelize_1 = require("sequelize");
const client_1 = require("../../domain/models/client");
class ClientSequelizeAdapter {
    async add(data) {
        const addAccountClient = await client_1.Client.create({
            name: data.name,
            lastName: data.lastName,
            telephone: data.telephone,
            email: data.email,
            password: data.password,
            secretKey: data.secretKey,
        });
        const clientData = addAccountClient.toJSON();
        delete clientData.password;
        delete clientData.secretKey;
        return clientData;
    }
    async getAccountByEmail(email) {
        return await client_1.Client.findOne({
            where: {
                email,
            },
        });
    }
    async updateStatusAccountClient(email) {
        return await client_1.Client.update({ statusAccount: true }, {
            where: {
                email,
                statusAccount: false,
            },
        });
    }
    async getAccount(value) {
        return await client_1.Client.findOne({
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
        const account = await client_1.Client.findByPk(id);
        if (!account) {
            return null;
        }
        const formatAccount = account.toJSON();
        delete formatAccount.password;
        delete formatAccount.secretKey;
        return formatAccount;
    }
    async loadClientById(id) {
        const account = await client_1.Client.findByPk(id);
        if (!account) {
            return null;
        }
        const formatAccount = account.toJSON();
        delete formatAccount.password;
        delete formatAccount.secretKey;
        return formatAccount;
    }
}
exports.ClientSequelizeAdapter = ClientSequelizeAdapter;
//# sourceMappingURL=user-sequelize-adapter.js.map