import { ListOwners } from '../../../domain/usecases/administrator-usecases/list-owners-usecase';
import { OwnerAttributes } from '../../../domain/models/owner';
import { AdministratorRepository } from '../../repositories/administrator-repository';

export class DbListOwners implements ListOwners {
    constructor(private readonly listOwnersRepository: AdministratorRepository) {}
    async listOwners(): Promise<OwnerAttributes[]> {
        return this.listOwnersRepository.listOwners();
    }
} 