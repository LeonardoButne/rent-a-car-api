import { ListClients } from '../../../domain/usecases/administrator-usecases/list-clients-usecase';
import { ClientAttributes } from '../../../domain/models/client';
import { AdministratorRepository } from '../../repositories/administrator-repository';

export class DbListClients implements ListClients {
    constructor(private readonly listClientsRepository: AdministratorRepository) {}
    async listClients(): Promise<ClientAttributes[]> {
        return this.listClientsRepository.listClients();
    }
} 