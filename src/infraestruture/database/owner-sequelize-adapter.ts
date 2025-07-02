import { Op } from 'sequelize';

import { Owner, OwnerAttributes } from '../../domain/models/owner';
import { OwnerModel, OwnerWithoutId } from '../../domain/usecases/owner-usecases/signup-owner-usecase';
import { OwnerRepository } from '../../data/repositories/owner-repository';

export class OwnerSequelizeAdapter implements OwnerRepository {
  async add(data: OwnerWithoutId): Promise<OwnerModel> {
    const addAccountOwner = await Owner.create({
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

  async getAccountByEmail(email: string): Promise<OwnerModel> {
    return await Owner.findOne({
      where: {
        email,
      },
    });
  }

  async updateStatusAccountOwner(email: string): Promise<boolean> {
    const [updated] = await Owner.update(
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

  async getAccount(value: string): Promise<OwnerModel> {
    return await Owner.findOne({
      where: {
        [Op.or]: [
          {
            email: value,
          },
        ],
      },
    });
  }

  async getAccountById(id: string): Promise<OwnerAttributes | null> {
    const account = await Owner.findByPk(id);

    if (!account) {
      return null;
    }

    const formatAccount = account.toJSON();
    delete formatAccount.password;
    delete formatAccount.secretKey;
    return formatAccount;
  }

  async loadOwnerById(id: string): Promise<OwnerAttributes | null> {
    const account = await Owner.findByPk(id);

    if (!account) {
      return null;
    }

    const formatAccount = account.toJSON();
    delete formatAccount.password;
    delete formatAccount.secretKey;
    return formatAccount;
  }
} 