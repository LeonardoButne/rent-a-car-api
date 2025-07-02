import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { SuspendClient } from '../../../domain/usecases/administrator-usecases/suspend-client-usecase';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class SuspendClientController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly suspendClient: SuspendClient,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const clientId = httpRequest.params?.clientId;
      if (!clientId) {
        return badRequest(new Error('clientId é obrigatório na rota.'));
      }
      const result = await this.suspendClient.suspendClient(clientId);
      if (!result) {
        return badRequest(new Error('Não foi possível encontrar o cliente.'));
      }
      return ok({ suspended: true });
    } catch (error) {
        if (error.errors) {
            return serverError({
              erro: error?.errors?.map((err: any) => err?.message),
            })
          } else {
            return serverError({ error })
          }
    }
  }
} 