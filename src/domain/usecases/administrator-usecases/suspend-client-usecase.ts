export interface SuspendClient {
    suspendClient(clientId: string): Promise<boolean>;
} 