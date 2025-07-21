import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { ListReviewsByOwnerUsecase } from '../../../domain/usecases/review-usecases';

export class ListReviewsByOwnerController implements Controller {
  constructor(private readonly listReviewsByOwner: ListReviewsByOwnerUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const ownerId = httpRequest.token?.sub;
      if (!ownerId) {
        return badRequest(new Error('Usuário não autenticado.'));
      }
      const reviews = await this.listReviewsByOwner.list(ownerId);
      return ok(reviews);
    } catch (error) {
      return serverError({ error: error.message || error });
    }
  }
} 