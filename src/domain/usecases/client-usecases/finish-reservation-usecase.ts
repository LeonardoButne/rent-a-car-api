import { ReservationAttributes } from '../../models/reservation';

export interface FinishReservationUsecase {
  finish(params: FinishReservationUsecase.Params): Promise<FinishReservationUsecase.Result>;
}

export namespace FinishReservationUsecase {
  export type Params = {
    reservationId: string;
    clientId: string;
  };
  export type Result = ReservationAttributes | null;
} 