import { SuspendClient } from '../../../domain/usecases/administrator-usecases/suspend-client-usecase';
import { AdministratorRepository } from '../../repositories/administrator-repository';

export class DbSuspendClient implements SuspendClient {
    constructor(private readonly suspendClientRepository: AdministratorRepository) {}
    async suspendClient(clientId: string): Promise<boolean> {
        return this.suspendClientRepository.suspendClient(clientId);
    }
}