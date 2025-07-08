import { badRequest, ok, serverError, unAuthorizedError } from '../helpers/http-helpers';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Validation } from '../protocols/validation';
import { AuthenticateUserUsecase } from '../../domain/usecases/authenticate-user-usecase';

export class LoginController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authenticateUser: AuthenticateUserUsecase,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }

      const { email, password, deviceId } = httpRequest.body;
      const result = await this.authenticateUser.auth({ email, password, deviceId });
      if (result === false) {
        return unAuthorizedError('Conta inativa ou suspensa');
      }
      if (result === 'invalid_credentials') {
        return unAuthorizedError('Credenciais inválidas');
      }
      if (result === null) {
        return {
          statusCode: 401,
          body: {
            otp_required: true,
            message: 'OTP enviado para seu email. Por favor, verifique sua caixa de entrada.'
          }
        };
      }
      return ok({
        token: result.token,
        role: result.role,
        user: {
          id: result.id,
          email: result.email,
          name: result.name,
          lastName: result.lastName,
        },
      });
    } catch (error) {
      return serverError(error);
    }
  }
} 