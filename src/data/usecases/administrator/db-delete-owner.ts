import { DeleteOwner } from '../../../domain/usecases/administrator-usecases/delete-owner-usecase';
import { AdministratorRepository } from '../../repositories/administrator-repository';

export class DbDeleteOwner implements DeleteOwner {
    constructor(private readonly deleteOwnerRepository: AdministratorRepository) {}
    async deleteOwner(ownerId: string): Promise<boolean> {
        return this.deleteOwnerRepository.deleteOwner(ownerId);
    }
} 