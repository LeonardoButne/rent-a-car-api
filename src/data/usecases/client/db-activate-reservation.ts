import { ActivateReservationUsecase } from '../../../domain/usecases/client-usecases/activate-reservation-usecase';
import { ActivateReservationRepository } from '../../repositories/reservation-repository';

export class DbActivateReservation implements ActivateReservationUsecase {
  constructor(private readonly activateReservationRepository: ActivateReservationRepository) {}

  async activate(params: ActivateReservationUsecase.Params): Promise<ActivateReservationUsecase.Result> {
    return await this.activateReservationRepository.activate(params.reservationId, params.clientId);
  }
} 