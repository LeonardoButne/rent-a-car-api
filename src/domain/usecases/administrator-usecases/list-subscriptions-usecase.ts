import { OwnerAttributes } from '../../models/owner';

export interface ListSubscriptions {
    listSubscriptions(): Promise<OwnerAttributes[]>;
} 