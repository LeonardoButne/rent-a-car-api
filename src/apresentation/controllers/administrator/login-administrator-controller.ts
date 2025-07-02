import { badRequest, ok, serverError, unAuthorizedError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';
import { AuthenticateAdministrator } from '../../../domain/usecases/administrator-usecases/login-administrator-usecase';

export class LoginAdministratorController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authenticate: AuthenticateAdministrator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      const { email, password } = httpRequest.body;

      if (error) {
        return badRequest(error);
      }

      const login = await this.authenticate.auth({ email, password });

      if (login === false) {
        return unAuthorizedError('Conta Inactiva');
      }

      if (login === null) {
        return unAuthorizedError(`Credenciais Inválidas`);
      }

      return ok({ message: 'OTP enviado com sucesso', email });
    } catch (error) {
      if (error.errors) {
        return serverError({
          erro: error?.errors?.map((err: any) => err?.message),
        });
      } else {
        return serverError({ error });
      }
    }
  }
} 