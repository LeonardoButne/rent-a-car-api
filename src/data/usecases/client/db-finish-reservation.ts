import { FinishReservationUsecase } from '../../../domain/usecases/client-usecases/finish-reservation-usecase';
import { ReservationAttributes } from '../../../domain/models/reservation';
import { FinishReservationRepository } from '../../repositories/reservation-repository';

export class DbFinishReservation implements FinishReservationUsecase {
  constructor(private readonly finishReservationRepository: FinishReservationRepository) {}

  async finish(params: FinishReservationUsecase.Params): Promise<FinishReservationUsecase.Result> {
    return await this.finishReservationRepository.finish(params.reservationId, params.clientId);
  }
} 