import { ok, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { ListReservationsByClient } from '../../../domain/usecases/reservation-usecases';

export class ListMyReservationsController implements Controller {
  constructor(private readonly listReservationsByClient: ListReservationsByClient) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const clientId = httpRequest.token?.sub;
      if (!clientId) {
        return { statusCode: 401, body: { error: 'Usuário não autenticado.' } };
      }
      const reservations = await this.listReservationsByClient.listByClient(clientId);
      return ok(reservations);
    } catch (error) {
      return serverError({ error });
    }
  }
} 