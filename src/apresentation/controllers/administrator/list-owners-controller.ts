import { ok, serverError } from '../../helpers/http-helpers';
import { ListOwners } from '../../../domain/usecases/administrator-usecases/list-owners-usecase';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class ListOwnersController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly listOwners: ListOwners,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return { statusCode: 400, body: error };
      }
      const owners = await this.listOwners.listOwners();
      return ok(owners);
    } catch (error) {
      return serverError({ error });
    }
  }
} 