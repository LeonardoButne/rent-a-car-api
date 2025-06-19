import { DbLoadUserByToken } from '../../../data/usecases/user/db-load-client-by-token';
import { LoadClientById } from '../../../domain/usecases/user-usecases/load-user-by-token-usecase';
import { JwtAdapter } from '../../../infraestruture/cryptograph/jwt/jwt-adpter';
import { ClientSequelizeAdapter } from '../../../infraestruture/database/user-sequelize-adpter';


export const dbLoadUserByTokenFactory = (): LoadClientById => {
    const jwtAdapter = new JwtAdapter(process.env.JWTSECRET_KEY)
    const userSequelizeAdapter = new ClientSequelizeAdapter()

    return new DbLoadUserByToken(jwtAdapter, userSequelizeAdapter)
}