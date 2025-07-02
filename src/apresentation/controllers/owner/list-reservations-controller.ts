import { ok, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { ListReservationsByOwner } from '../../../domain/usecases/reservation-usecases';

export class ListReservationsController implements Controller {
  constructor(private readonly listReservationsByOwner: ListReservationsByOwner) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const ownerId = httpRequest.token?.sub;
      if (!ownerId) {
        return { statusCode: 401, body: { error: 'Usuário não autenticado.' } };
      }
      const reservations = await this.listReservationsByOwner.listByOwner(ownerId);
      return ok(reservations);
    } catch (error) {
      return serverError({ error });
    }
  }
} 