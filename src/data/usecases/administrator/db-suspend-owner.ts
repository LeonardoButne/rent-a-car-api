import { SuspendOwner } from '../../../domain/usecases/administrator-usecases/suspend-owner-usecase';
import { AdministratorRepository } from '../../repositories/administrator-repository';

export class DbSuspendOwner implements SuspendOwner {
    constructor(private readonly suspendOwnerRepository: AdministratorRepository) {}
    async suspendOwner(ownerId: string): Promise<boolean> {
        return this.suspendOwnerRepository.suspendOwner(ownerId);
    }
} 