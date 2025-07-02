export interface DeleteClient {
    deleteClient(clientId: string): Promise<boolean>;
} 