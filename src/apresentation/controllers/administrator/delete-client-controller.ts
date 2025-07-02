import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { DeleteClient } from '../../../domain/usecases/administrator-usecases/delete-client-usecase';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class DeleteClientController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteClient: DeleteClient,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const clientId = httpRequest.params?.clientId;
      const result = await this.deleteClient.deleteClient(clientId);
      if (!result) {
        return badRequest(new Error('Não foi possível remover o cliente.'));
      }
      return ok({ deleted: true });
    } catch (error) {
      return serverError({ error });
    }
  }
} 