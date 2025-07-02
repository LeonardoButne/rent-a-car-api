export interface DeleteOwner {
    deleteOwner(ownerId: string): Promise<boolean>;
} 