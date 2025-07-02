import { badRequest, ok, serverError, unAuthorizedError } from '../../helpers/http-helpers';

import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

import { AuthenticateOwner } from '../../../domain/usecases/owner-usecases/authenticate-owner-usecase';

export class LoginOwnerController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authenticate: AuthenticateOwner,
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

      // Agora o OTP foi gerado dentro do usecase, e o decorator enviará o OTP
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