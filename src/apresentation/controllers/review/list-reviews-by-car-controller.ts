import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { ListReviewsByCarUsecase } from '../../../domain/usecases/review-usecases';

export class ListReviewsByCarController implements Controller {
  constructor(private readonly listReviewsByCar: ListReviewsByCarUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const carId = httpRequest.params?.carId;
      if (!carId) {
        return badRequest(new Error('carId é obrigatório.'));
      }
      const reviews = await this.listReviewsByCar.list(carId);
      return ok(reviews);
    } catch (error) {
      return serverError({ error: error.message || error });
    }
  }
} 