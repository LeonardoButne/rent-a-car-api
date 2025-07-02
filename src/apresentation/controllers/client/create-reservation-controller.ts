import { badRequest, created, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';
import { CreateReservation } from '../../../domain/usecases/reservation-usecases';

export class CreateReservationController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createReservation: CreateReservation,
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
      return created(reservation);
    } catch (error) {
      return serverError({ error });
    }
  }
} 