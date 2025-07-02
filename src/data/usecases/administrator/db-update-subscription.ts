import { UpdateSubscription } from '../../../domain/usecases/administrator-usecases/update-subscription-usecase';
import { AdministratorRepository } from '../../repositories/administrator-repository';

export class DbUpdateSubscription implements UpdateSubscription {
    constructor(private readonly updateSubscriptionRepository: AdministratorRepository) {}
    async update(ownerId: string, data: any): Promise<boolean> {
        return this.updateSubscriptionRepository.update(ownerId, data);
    }
} 