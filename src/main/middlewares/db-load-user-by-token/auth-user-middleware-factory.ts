import { DbLoadUserByToken } from '../../../data/usecases/client/db-load-client-by-token';
import { LoadClientById } from '../../../domain/usecases/client-usecases/load-user-by-token-usecase';
import { JwtAdapter } from '../../../infraestruture/cryptograph/jwt/jwt-adpter';
import { ClientSequelizeAdapter } from '../../../infraestruture/database/client-sequelize-adapter';

export const dbLoadUserByTokenFactory = (): LoadClientById => {
  const jwtAdapter = new JwtAdapter(process.env.JWTSECRET_KEY);
  const userSequelizeAdapter = new ClientSequelizeAdapter();

  return new DbLoadUserByToken(jwtAdapter, userSequelizeAdapter);
};
