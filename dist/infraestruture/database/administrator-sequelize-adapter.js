"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministratorSequelizeAdapter = void 0;
const sequelize_1 = require("sequelize");
const administrator_1 = require("../../domain/models/administrator");
const client_1 = require("../../domain/models/client");
const owner_1 = require("../../domain/models/owner");
class AdministratorSequelizeAdapter {
    async add(data) {
        const addAccountAdministrator = await administrator_1.Administrador.create({
            userName: data.userName,
            email: data.email,
            password: data.password,
            secretKey: data.secretKey,
            typeAccount: data.typeAccount,
            statusAccount: data.statusAccount,
        });
        const adminData = addAccountAdministrator.toJSON();
        delete adminData.password;
        delete adminData.secretKey;
        return adminData;
    }
    async getAccountByEmail(email) {
        return await administrator_1.Administrador.findOne({
            where: {
                email,
            },
        });
    }
    async updateStatusAccountAdministrator(email) {
        const [updated] = await administrator_1.Administrador.update({ statusAccount: true }, {
            where: {
                email,
                statusAccount: false,
            },
        });
        return updated > 0;
    }
    async getAccount(value) {
        return await administrator_1.Administrador.findOne({
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
        const account = await administrator_1.Administrador.findByPk(id);
        if (!account) {
            return null;
        }
        const formatAccount = account.toJSON();
        delete formatAccount.password;
        delete formatAccount.secretKey;
        return formatAccount;
    }
    async listClients() {
        return await client_1.Client.findAll({
            attributes: { exclude: ['password', 'secretKey'] }
        });
    }
    async suspendClient(clientId) {
        const [updated] = await client_1.Client.update({ isSuspended: true }, { where: { id: clientId } });
        return updated > 0;
    }
    async deleteClient(clientId) {
        const deleted = await client_1.Client.destroy({ where: { id: clientId } });
        return deleted > 0;
    }
    async listOwners() {
        return await owner_1.Owner.findAll({
            attributes: { exclude: ['password', 'secretKey'] }
        });
    }
    async suspendOwner(ownerId) {
        const [updated] = await owner_1.Owner.update({ isSuspended: true }, { where: { id: ownerId } });
        return updated > 0;
    }
    async deleteOwner(ownerId) {
        const deleted = await owner_1.Owner.destroy({ where: { id: ownerId } });
        return deleted > 0;
    }
    async listSubscriptions() {
        return await owner_1.Owner.findAll();
    }
    async getByOwnerId(ownerId) {
        return await owner_1.Owner.findByPk(ownerId);
    }
    async update(ownerId, data) {
        const [updated] = await owner_1.Owner.update(data, { where: { id: ownerId } });
        return updated > 0;
    }
    async getSummary() {
        const totalClients = await client_1.Client.count();
        const totalOwners = await owner_1.Owner.count();
        // Supondo que existam models Reservation e métodos para receita
        const totalReservations = 0; // implementar conforme seu model
        const totalRevenue = 0; // implementar conforme seu model
        const revenueByMonth = {}; // implementar conforme seu model
        return { totalClients, totalOwners, totalReservations, totalRevenue, revenueByMonth };
    }
    async getRevenueReport() {
        return {
            totalRevenue: 0,
            revenueByMonth: {},
        };
    }
    async getReservationsReport() {
        return {
            totalReservations: 0,
            reservationsByMonth: {},
        };
    }
}
exports.AdministratorSequelizeAdapter = AdministratorSequelizeAdapter;
//# sourceMappingURL=administrator-sequelize-adapter.js.map