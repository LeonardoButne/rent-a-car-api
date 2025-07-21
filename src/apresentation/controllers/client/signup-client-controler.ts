import { badRequest, created, serverError } from '../../../apresentation/helpers/http-helpers';
import { SignupClient } from '../../../domain/usecases/client-usecases/signup-client-usecase';

import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class SignupClientController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly signupClient: SignupClient,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      const { name, email, password, lastName, telephone } = httpRequest.body;

      if (error) {
        return badRequest(error);
      }

      const add = await this.signupClient.add({
        name,
        lastName,
        telephone,
        email,
        password,
      });

      return created(add);
    } catch (error) {
      if (error && typeof error === 'object' && 'otp_required' in error) {
        return {
          statusCode: 401,
          body: {
            otp_required: true,
            message: error['message'] || 'E-mail já cadastrado, mas ainda não verificado. Complete a verificação.'
          }
        };
      }
      if (error.errors) {
        return serverError({
          erro: error.errors.map((err: any) => err.message),
        });
      } else {
        return serverError({ error: error.message || error });
      }
    }
  }
}
