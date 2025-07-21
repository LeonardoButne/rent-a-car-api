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
      if (result && typeof result === 'object' && 'otp_required' in result) {
        return {
          statusCode: 401,
          body: {
            otp_required: true,
            message: result['message'] || 'Seu e-mail ainda não foi verificado. Por favor, verifique sua caixa de entrada e insira o código de verificação.',
          },
        };
      }
      if (result === null) {
        // Correção: não retornar otp_required, apenas erro genérico
        return unAuthorizedError('Credenciais inválidas');
      }
      // Só retorna dados de usuário se não for otp_required
      return ok({
        token: (result as any).token,
        role: (result as any).role,
        user: {
          id: (result as any).id,
          email: (result as any).email,
          name: (result as any).name,
          lastName: (result as any).lastName,
        },
      });
    } catch (error) {
      return serverError(error);
    }
  }
} 