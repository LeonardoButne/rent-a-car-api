import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { CancelReservation } from '../../../domain/usecases/reservation-usecases';

export class CancelReservationController implements Controller {
  constructor(private readonly cancelReservation: CancelReservation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { reservationId } = httpRequest.params;
      const clientId = httpRequest.token?.sub;
      if (!reservationId || !clientId) {
        return badRequest(new Error('Dados obrigatórios não informados.'));
      }
      const result = await this.cancelReservation.cancel(reservationId, clientId);
      if (!result) {
        return badRequest(new Error('Não foi possível cancelar a reserva.'));
      }
      return ok({ cancelled: true });
    } catch (error) {
      return serverError({ error });
    }
  }
} 