import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { GetSubscriptionByOwner } from '../../../domain/usecases/administrator-usecases/get-subscription-by-owner-usecase';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class GetSubscriptionByOwnerController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly getSubscriptionByOwner: GetSubscriptionByOwner,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const { ownerId } = httpRequest.params;
      const subscription = await this.getSubscriptionByOwner.getByOwnerId(ownerId);
      if (!subscription) {
        return badRequest(new Error('Subscrição não localizada.'));
      }
      return ok(subscription);
    } catch (error) {
      return serverError({ error });
    }
  }
} 