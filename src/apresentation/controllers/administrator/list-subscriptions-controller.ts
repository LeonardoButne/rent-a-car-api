import { ok, serverError } from '../../helpers/http-helpers';
import { ListSubscriptions } from '../../../domain/usecases/administrator-usecases/list-subscriptions-usecase';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class ListSubscriptionsController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly listSubscriptions: ListSubscriptions,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return { statusCode: 400, body: error };
      }
      const subscriptions = await this.listSubscriptions.listSubscriptions();
      return ok(subscriptions);
    } catch (error) {
      return serverError({ error });
    }
  }
} 