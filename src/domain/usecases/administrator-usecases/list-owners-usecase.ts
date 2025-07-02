import { OwnerAttributes } from '../../models/owner';

export interface ListOwners {
    listOwners(): Promise<OwnerAttributes[]>;
} 