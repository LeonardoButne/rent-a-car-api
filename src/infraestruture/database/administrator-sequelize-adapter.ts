import { Op } from 'sequelize';

import { Administrador, AdministradorAttributes } from '../../domain/models/administrator';
import { Client, ClientAttributes } from '../../domain/models/client';
import { Owner, OwnerAttributes } from '../../domain/models/owner';
import { AdministratorModel, AdministratorWithoutId } from '../../domain/usecases/administrator-usecases/signup-administrator-usecase';
import { AdministratorRepository } from '../../data/repositories/administrator-repository';

export class AdministratorSequelizeAdapter
  implements
  AdministratorRepository
{
  async add(data: AdministratorWithoutId): Promise<AdministratorModel> {
    const addAccountAdministrator = await Administrador.create({
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

  async getAccountByEmail(email: string): Promise<AdministratorModel> {
    return await Administrador.findOne({
      where: {
        email,
      },
    });
  }

  async updateStatusAccountAdministrator(email: string): Promise<boolean> {
    const [updated] = await Administrador.update(
      { statusAccount: true },
      {
        where: {
          email,
          statusAccount: false,
        },
      },
    );
    return updated > 0;
  }

  async getAccount(value: string): Promise<AdministratorModel> {
    return await Administrador.findOne({
      where: {
        [Op.or]: [
          {
            email: value,
          },
        ],
      },
    });
  }

  async getAccountById(id: string): Promise<AdministradorAttributes | null> {
    const account = await Administrador.findByPk(id);
    if (!account) {
      return null;
    }
    const formatAccount = account.toJSON();
    delete formatAccount.password;
    delete formatAccount.secretKey;
    return formatAccount;
  }

  async listClients(): Promise<ClientAttributes[]> {
    return await Client.findAll({
        attributes: { exclude: ['password', 'secretKey'] }
    });
  }

  async suspendClient(clientId: string): Promise<boolean> {
    const [updated] = await Client.update(
      { isSuspended: true },
      { where: { id: clientId } }
    );
    return updated > 0;
  }

  async deleteClient(clientId: string): Promise<boolean> {
    const deleted = await Client.destroy({ where: { id: clientId } });
    return deleted > 0;
  }

  async listOwners(): Promise<OwnerAttributes[]> {
    return await Owner.findAll({
            attributes: { exclude: ['password', 'secretKey'] }
        });
  }

  async suspendOwner(ownerId: string): Promise<boolean> {
    const [updated] = await Owner.update(
      { isSuspended: true },
      { where: { id: ownerId } }
    );
    return updated > 0;
  }

  async deleteOwner(ownerId: string): Promise<boolean> {
    const deleted = await Owner.destroy({ where: { id: ownerId } });
    return deleted > 0;
  }

  async listSubscriptions(): Promise<OwnerAttributes[]> {
    return await Owner.findAll();
  }

  async getByOwnerId(ownerId: string): Promise<OwnerAttributes | null> {
    return await Owner.findByPk(ownerId);
  }

  async update(ownerId: string, data: any): Promise<boolean> {
    const [updated] = await Owner.update(data, { where: { id: ownerId } });
    return updated > 0;
  }

  async getSummary() {
    const totalClients = await Client.count();
    const totalOwners = await Owner.count();
    // Supondo que existam models Reservation e métodos para receita
    const totalReservations = 0; // implementar conforme seu model
    const totalRevenue = 0; // implementar conforme seu model
    const revenueByMonth = {}; // implementar conforme seu model
    return { totalClients, totalOwners, totalReservations, totalRevenue, revenueByMonth };
  }

  async getRevenueReport(): Promise<{ totalRevenue: number; revenueByMonth: { [month: string]: number } }> {
    return {
      totalRevenue: 0,
      revenueByMonth: {},
    };
  }

  async getReservationsReport(): Promise<{ totalReservations: number; reservationsByMonth: { [month: string]: number } }> {
    return {
      totalReservations: 0,
      reservationsByMonth: {},
    };
  }
}
