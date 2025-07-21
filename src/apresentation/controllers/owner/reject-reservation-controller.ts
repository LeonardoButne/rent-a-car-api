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
      if (!reservationId || !ownerId) {
        return badRequest(new Error('Dados obrigatórios não informados.'));
      }
      const result = await this.updateReservationStatus.updateStatus(reservationId, ownerId, 'rejected');
      if (!result) {
        return badRequest(new Error('Não foi possível rejeitar a reserva.'));
      }
      // Buscar clientId da reserva rejeitada
      const reservation = await this.getReservationById.getById(reservationId);
      const clientId = reservation?.clientId;
      if (clientId) {
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
      if (error.errors) {
        return serverError({
          erro: error?.errors?.map((err: any) => err?.message),
        });
      } else {
        return serverError({ error });
      }
    }
  }
} 