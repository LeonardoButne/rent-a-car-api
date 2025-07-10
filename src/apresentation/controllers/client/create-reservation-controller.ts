import { badRequest, created, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';
import { CreateReservation } from '../../../domain/usecases/reservation-usecases';
import { ReservationNotificationService } from '../../../services/reservation-notification-service';

export class CreateReservationController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createReservation: CreateReservation,
    private readonly reservationNotificationService: ReservationNotificationService,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const { carId, ownerId, startDate, endDate, notes } = httpRequest.body;
      const clientId = httpRequest.token?.sub;
      if (!clientId) {
        return badRequest(new Error('Usuário não autenticado.'));
      }
      const reservation = await this.createReservation.create({
        carId,
        clientId,
        ownerId,
        startDate,
        endDate,
        notes,
      });

      // Notificação e push para o owner (delegado ao serviço)
      await this.reservationNotificationService.notifyOwnerOnReservationCreated({
        ownerId,
        carId,
        reservationId: reservation.id,
      });

      return created(reservation);
    } catch (error) {
      return serverError({ error });
    }
  }
} 