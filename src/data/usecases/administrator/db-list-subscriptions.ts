import { ListSubscriptions } from '../../../domain/usecases/administrator-usecases/list-subscriptions-usecase';
import { OwnerAttributes } from '../../../domain/models/owner';
import { AdministratorRepository } from '../../repositories/administrator-repository';

export class DbListSubscriptions implements ListSubscriptions {
    constructor(private readonly listSubscriptionsRepository: AdministratorRepository) {}
    async listSubscriptions(): Promise<OwnerAttributes[]> {
        return this.listSubscriptionsRepository.listSubscriptions();
    }
} 