import { ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { UpdateReservationStatus, GetReservationById } from '../../../domain/usecases/reservation-usecases';
import { ReservationNotificationService } from '../../../services/reservation-notification-service';

export class RejectReservationController implements Controller {
  constructor(
    private readonly updateReservationStatus: UpdateReservationStatus,
    private readonly getReservationById: GetReservationById,
    private readonly reservationNotificationService: ReservationNotificationService
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { reservationId } = httpRequest.params;
      const ownerId = httpRequest.token?.sub;
      console.log('[RejectReservationController] reservationId:', reservationId, 'ownerId:', ownerId);
      if (!reservationId || !ownerId) {
        console.log('[RejectReservationController] Dados obrigatórios não informados.');
        return badRequest(new Error('Dados obrigatórios não informados.'));
      }
      const result = await this.updateReservationStatus.updateStatus(reservationId, ownerId, 'rejected');
      console.log('[RejectReservationController] updateReservationStatus result:', result);
      if (!result) {
        console.log('[RejectReservationController] Não foi possível rejeitar a reserva.');
        return badRequest(new Error('Não foi possível rejeitar a reserva.'));
      }
      // Buscar clientId da reserva rejeitada
      const reservation = await this.getReservationById.getById(reservationId);
      console.log('[RejectReservationController] reservation:', reservation);
      const clientId = reservation?.clientId;
      if (clientId) {
        console.log('[RejectReservationController] Notificando clientId:', clientId);
        await this.reservationNotificationService.notifyClientOnReservationStatusChanged({
          clientId,
          reservationId,
          status: 'rejected',
        });
      } else {
        console.log('[RejectReservationController] clientId não encontrado para reservationId:', reservationId);
      }
      return ok(result);
    } catch (error) {
      console.log('[RejectReservationController] Erro:', error);
      return serverError({ error });
    }
  }
} 