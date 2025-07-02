import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { SuspendOwner } from '../../../domain/usecases/administrator-usecases/suspend-owner-usecase';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class SuspendOwnerController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly suspendOwner: SuspendOwner,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }

      const ownerId = httpRequest.params?.ownerId;

      const result = await this.suspendOwner.suspendOwner(ownerId);
      if (!result) {
        return badRequest(new Error('Não foi possível encontrar o proprietario.'));
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