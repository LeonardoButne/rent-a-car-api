import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { EditReservation } from '../../../domain/usecases/reservation-usecases';

export class EditReservationController implements Controller {
  constructor(private readonly editReservation: EditReservation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { reservationId } = httpRequest.params;
      const clientId = httpRequest.token?.sub;
      const { startDate, endDate, notes } = httpRequest.body;
      if (!reservationId || !clientId) {
        return badRequest(new Error('Dados obrigatórios não informados.'));
      }
      const reservation = await this.editReservation.edit(reservationId, clientId, { startDate, endDate, notes });
      if (!reservation) {
        return badRequest(new Error('Não foi possível editar a reserva.')); 
      }
      return ok(reservation);
    } catch (error) {
      return serverError({ error });
    }
  }
} 