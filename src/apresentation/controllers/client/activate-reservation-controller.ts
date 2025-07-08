import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { ActivateReservationUsecase } from '../../../domain/usecases/client-usecases/activate-reservation-usecase';

export class ActivateReservationController implements Controller {
  constructor(private readonly activateReservationUsecase: ActivateReservationUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { reservationId } = httpRequest.params;
      const clientId = httpRequest.token?.sub;
      if (!reservationId || !clientId) {
        return badRequest(new Error('Dados obrigatórios não informados.'));
      }
      const result = await this.activateReservationUsecase.activate({ reservationId, clientId });
      if (!result) {
        return badRequest(new Error('Não foi possível ativar a reserva.'));
      }
      return ok(result);
    } catch (error) {
      return serverError({ error });
    }
  }
} 