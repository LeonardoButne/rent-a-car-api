import { Op } from 'sequelize';

import { Client, ClientAttributes } from '../../domain/models/client';
import { ClientModel, ClientWithoutId } from '../../domain/usecases/user-usecases/signup-client-usecase';
import { GetAccountClientByIdRepository } from '../../data/repositories/user/get-account-client-by-id-repository';
import { AddAccountClientRepository, GetAccountClientByEmailRepository, UpdateStatusAccountClientRepository } from '../../data/repositories/user';

export class ClientSequelizeAdapter
  implements
    AddAccountClientRepository,
    GetAccountClientByEmailRepository,
    UpdateStatusAccountClientRepository,
    GetAccountClientByIdRepository
{
  async add(data: ClientWithoutId): Promise<ClientModel> {
    const addAccountClient = await Client.create({
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

  async getAccountByEmail(email: string): Promise<ClientModel> {
    return await Client.findOne({
      where: {
        email,
      },
    });
  }

  async updateStatusAccountClient(email: string): Promise<[number]> {
    return await Client.update(
      { statusAccount: true },
      {
        where: {
          email,
          statusAccount: false,
        },
      },
    );
  }

  async getAccount(value: string): Promise<ClientModel> {
    return await Client.findOne({
      where: {
        [Op.or]: [
          {
            email: value,
          },
        ],
      },
    });
  }

  async getAccountById(id: string): Promise<ClientAttributes | null> {
    const account = await Client.findByPk(id);

    if (!account) {
      return null;
    }

    const formatAccount = account.toJSON();
    delete formatAccount.password;
    delete formatAccount.secretKey;
    return formatAccount;
  }

  async loadClientById(id: string): Promise<ClientAttributes | null> {
    const account = await Client.findByPk(id);

    if (!account) {
      return null;
    }

    const formatAccount = account.toJSON();
    delete formatAccount.password;
    delete formatAccount.secretKey;
    return formatAccount;
  }
}
