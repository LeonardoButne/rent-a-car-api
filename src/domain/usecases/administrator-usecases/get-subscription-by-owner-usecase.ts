import { OwnerAttributes } from '../../models/owner';

export interface GetSubscriptionByOwner {
    getByOwnerId(ownerId: string): Promise<OwnerAttributes | null>;
} 