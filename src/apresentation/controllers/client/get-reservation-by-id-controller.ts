import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { GetReservationById } from '../../../domain/usecases/reservation-usecases';

export class GetReservationByIdController implements Controller {
  constructor(private readonly getReservationById: GetReservationById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { reservationId } = httpRequest.params;
      if (!reservationId) {
        return badRequest(new Error('ID da reserva não informado.'));
      }
      const reservation = await this.getReservationById.getById(reservationId);
      if (!reservation) {
        return badRequest(new Error('Reserva não encontrada.'));
      }
      return ok(reservation);
    } catch (error) {
      return serverError({ error });
    }
  }
} 