import { ok, serverError } from '../../helpers/http-helpers';
import { ListClients } from '../../../domain/usecases/administrator-usecases/list-clients-usecase';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class ListClientsController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly listClients: ListClients,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return { statusCode: 400, body: error };
      }
      const clients = await this.listClients.listClients();
      return ok(clients);
    } catch (error) {
      return serverError({ error });
    }
  }
} 