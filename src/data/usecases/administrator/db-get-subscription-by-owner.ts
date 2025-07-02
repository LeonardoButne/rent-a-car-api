import { GetSubscriptionByOwner } from '../../../domain/usecases/administrator-usecases/get-subscription-by-owner-usecase';
import { OwnerAttributes } from '../../../domain/models/owner';
import { AdministratorRepository } from '../../repositories/administrator-repository';

export class DbGetSubscriptionByOwner implements GetSubscriptionByOwner {
    constructor(private readonly getSubscriptionByOwnerRepository: AdministratorRepository) {}
    async getByOwnerId(ownerId: string): Promise<OwnerAttributes | null> {
        return this.getSubscriptionByOwnerRepository.getByOwnerId(ownerId);
    }
} 