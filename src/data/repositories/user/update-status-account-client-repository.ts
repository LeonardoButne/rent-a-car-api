export interface UpdateStatusAccountClientRepository {
    updateStatusAccountClient(email: string): Promise<[number]>
}
