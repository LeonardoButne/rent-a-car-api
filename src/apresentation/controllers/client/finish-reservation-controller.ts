import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { FinishReservationUsecase } from '../../../domain/usecases/client-usecases/finish-reservation-usecase';

export class FinishReservationController implements Controller {
  constructor(private readonly finishReservationUsecase: FinishReservationUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { reservationId } = httpRequest.params;
      const clientId = httpRequest.token?.sub;
      if (!reservationId || !clientId) {
        return badRequest(new Error('Dados obrigatórios não informados.'));
      }
      const result = await this.finishReservationUsecase.finish({ reservationId, clientId });
      if (!result) {
        return badRequest(new Error('Não foi possível finalizar a reserva.'));
      }
      return ok(result);
    } catch (error) {
      return serverError({ error });
    }
  }
} 