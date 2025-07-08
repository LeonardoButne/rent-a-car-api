import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { UpdateReservationStatus, CompleteReservation } from '../../../domain/usecases/reservation-usecases';

export class UpdateReservationStatusController implements Controller {
  constructor(
    private readonly updateReservationStatus: UpdateReservationStatus,
    private readonly completeReservation: CompleteReservation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { reservationId } = httpRequest.params;
      const ownerId = httpRequest.token?.sub;
      const { status } = httpRequest.body;
      if (!reservationId || !ownerId || !['approved', 'rejected', 'completed'].includes(status)) {
        return badRequest(new Error('Dados obrigatórios não informados ou status inválido.'));
      }
      if (status === 'completed') {
        const result = await this.completeReservation.complete(reservationId, ownerId);
        if (!result) {
          return badRequest(new Error('Não foi possível finalizar a reserva.'));
        }
        return ok(result);
      }
      const result = await this.updateReservationStatus.updateStatus(reservationId, ownerId, status);
      if (!result) {
        return badRequest(new Error('Não foi possível atualizar o status da reserva.'));
      }
      return ok(result);
    } catch (error) {
      return serverError({ error });
    }
  }
} 