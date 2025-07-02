import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { UpdateSubscription } from '../../../domain/usecases/administrator-usecases/update-subscription-usecase';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class UpdateSubscriptionController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updateSubscription: UpdateSubscription,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const { ownerId } = httpRequest.params;
      const result = await this.updateSubscription.update(ownerId, httpRequest.body);
      if (!result) {
        return badRequest(new Error('Não foi possível atualizar a subscrição.'));
      }
      return ok({ updated: true });
    } catch (error) {
      return serverError({ error });
    }
  }
} 