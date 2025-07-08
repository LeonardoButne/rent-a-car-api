import { ReservationAttributes } from '../../models/reservation';

export interface ActivateReservationUsecase {
  activate(params: ActivateReservationUsecase.Params): Promise<ActivateReservationUsecase.Result>;
}

export namespace ActivateReservationUsecase {
  export type Params = {
    reservationId: string;
    clientId: string;
  };
  export type Result = ReservationAttributes | null;
} 