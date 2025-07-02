export interface SuspendOwner {
    suspendOwner(ownerId: string): Promise<boolean>;
} 