import { ClientModel, ClientWithoutId } from '../../../domain/usecases/user-usecases/signup-client-usecase'

export interface AddAccountClientRepository {
    add(data: ClientWithoutId): Promise<ClientModel>
}
