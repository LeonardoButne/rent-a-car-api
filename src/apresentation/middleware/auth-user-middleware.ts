import { LoadUserById } from '../../domain/usecases/user-usecases/load-user-by-token-usecase';
import { JwtAdapter } from '../../infra/cryptograph/jwt/jwt-adpter';
import { AccessDeniedError } from '../errors/access-denied-error';
import { forbidden, ok, serverError } from '../helpers/http-helpers';
import { HttpRequest, HttpResponse } from '../protocols';
import { Middleware } from '../protocols/midleware';

export class AuthUserMiddleware implements Middleware {
  constructor(private readonly loadUserByToken: LoadUserById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const jwt = new JwtAdapter(process.env.JWTSECRET_KEY);

    try {
      const authHeader = httpRequest.header?.authorization;

      if (!authHeader) {
        return forbidden(new AccessDeniedError('Token não fornecido'));
      }

      const [bearer, token] = httpRequest.header.authorization.split(' ');

      if (bearer !== 'Bearer' || !token) {
        return forbidden(new AccessDeniedError());
      }

      const payload = await jwt.decrypt(token);

      return ok({ token: payload });
    } catch (error) {
      return serverError(error);
    }
  }
}
