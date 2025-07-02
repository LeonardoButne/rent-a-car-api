export interface UpdateSubscription {
    update(ownerId: string, data: any): Promise<boolean>;
} 