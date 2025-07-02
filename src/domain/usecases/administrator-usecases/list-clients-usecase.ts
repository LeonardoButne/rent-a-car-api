import { ClientAttributes } from '../../models/client';

export interface ListClients {
    listClients(): Promise<ClientAttributes[]>;
} 