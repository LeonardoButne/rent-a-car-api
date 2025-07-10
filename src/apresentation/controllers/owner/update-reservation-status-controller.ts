import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { UpdateReservationStatus, CompleteReservation } from '../../../domain/usecases/reservation-usecases';
import { ReservationNotificationService } from '../../../services/reservation-notification-service';

export class UpdateReservationStatusController implements Controller {
  constructor(
    private readonly updateReservationStatus: UpdateReservationStatus,
    private readonly completeReservation: CompleteReservation,
    private readonly reservationNotificationService: ReservationNotificationService,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { reservationId } = httpRequest.params;
      const ownerId = httpRequest.token?.sub;
      const { status, clientId } = httpRequest.body;
      if (!reservationId || !ownerId || !['approved', 'rejected', 'completed'].includes(status) || !clientId) {
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

      // Notificação e push para o client (delegado ao serviço)
      if (status === 'approved' || status === 'rejected') {
        await this.reservationNotificationService.notifyClientOnReservationStatusChanged({
          clientId,
          reservationId,
          status,
        });
      }

      return ok(result);
    } catch (error) {
      return serverError({ error });
    }
  }
} 