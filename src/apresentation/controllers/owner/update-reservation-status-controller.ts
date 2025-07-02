import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { UpdateReservationStatus } from '../../../domain/usecases/reservation-usecases';

export class UpdateReservationStatusController implements Controller {
  constructor(private readonly updateReservationStatus: UpdateReservationStatus) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { reservationId } = httpRequest.params;
      const ownerId = httpRequest.token?.sub;
      const { status } = httpRequest.body;
      if (!reservationId || !ownerId || !['approved', 'rejected'].includes(status)) {
        return badRequest(new Error('Dados obrigatórios não informados ou status inválido.'));
      }
      const result = await this.updateReservationStatus.updateStatus(reservationId, ownerId, status);
      if (!result) {
        return badRequest(new Error('Não foi possível atualizar o status da reserva.'));
      }
      return ok({ updated: true });
    } catch (error) {
      return serverError({ error });
    }
  }
} 