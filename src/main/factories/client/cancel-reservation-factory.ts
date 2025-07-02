import { CancelReservationController } from '../../../apresentation/controllers/client/cancel-reservation-controller';
import { Controller } from '../../../apresentation/protocols';
import { DbCancelReservation } from '../../../data/usecases/reservation';
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';

export const makeCancelReservationController = (): Controller => {
  const reservationRepo = new ReservationSequelizeAdapter();
  const cancelReservation = new DbCancelReservation(reservationRepo);
  return new CancelReservationController(cancelReservation);
}; 