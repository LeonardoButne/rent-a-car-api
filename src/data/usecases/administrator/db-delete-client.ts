import { DeleteClient } from '../../../domain/usecases/administrator-usecases/delete-client-usecase';
import { AdministratorRepository } from '../../repositories/administrator-repository';

export class DbDeleteClient implements DeleteClient {
    constructor(private readonly deleteClientRepository: AdministratorRepository) {}
    async deleteClient(clientId: string): Promise<boolean> {
        return this.deleteClientRepository.deleteClient(clientId);
    }
}