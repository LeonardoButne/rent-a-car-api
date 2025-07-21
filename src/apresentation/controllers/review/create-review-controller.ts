import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { badRequest, ok, serverError } from '../../helpers/http-helpers';
import { CreateReviewUsecase } from '../../../domain/usecases/review-usecases';
import { Validation } from '../../protocols/validation';

export class CreateReviewController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createReview: CreateReviewUsecase
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const clientId = httpRequest.token?.sub;
      if (!clientId) {
        return badRequest(new Error('Usuário não autenticado.'));
      }
      const { ownerId, reservationId, rating, comment } = httpRequest.body;
      if (!ownerId || !reservationId || !rating) {
        return badRequest(new Error('Campos obrigatórios: ownerId, reservationId, rating.'));
      }
      try {
        const review = await this.createReview.create({
          ownerId,
          clientId,
          reservationId,
          rating,
          comment,
        });
        return ok(review);
      } catch (err: any) {
        // Erros de negócio previsíveis
        return badRequest(new Error(err.message || err));
      }
    } catch (error) {
      // Erros inesperados
      return serverError({ error: error.message || error });
    }
  }
} 