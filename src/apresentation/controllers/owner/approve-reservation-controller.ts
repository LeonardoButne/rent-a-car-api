import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { UpdateReservationStatus } from '../../../domain/usecases/reservation-usecases';

export class ApproveReservationController implements Controller {
  constructor(private readonly updateReservationStatus: UpdateReservationStatus) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { reservationId } = httpRequest.params;
      const ownerId = httpRequest.token?.sub;
      if (!reservationId || !ownerId) {
        return badRequest(new Error('Dados obrigatórios não informados.'));
      }
      const result = await this.updateReservationStatus.updateStatus(reservationId, ownerId, 'approved');
      if (!result) {
        return badRequest(new Error('Não foi possível aprovar a reserva.'));
      }
      return ok(result);
    } catch (error) {
      return serverError({ error });
    }
  }
} 