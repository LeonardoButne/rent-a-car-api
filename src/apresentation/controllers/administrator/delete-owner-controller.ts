import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { DeleteOwner } from '../../../domain/usecases/administrator-usecases/delete-owner-usecase';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class DeleteOwnerController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteOwner: DeleteOwner,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const ownerId = httpRequest.params?.ownerId;
      const result = await this.deleteOwner.deleteOwner(ownerId);
      if (!result) {
        return badRequest(new Error('Não foi possível encontrar o proprietario.'));
      }
      return ok({ deleted: true });
    } catch (error) {
      return serverError({ error });
    }
  }
} 