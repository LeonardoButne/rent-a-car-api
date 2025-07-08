import { RejectReservationController } from '../../../apresentation/controllers/owner/reject-reservation-controller';
import { Controller } from '../../../apresentation/protocols';
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';
import { DbUpdateReservationStatus } from '../../../data/usecases/reservation';

export const makeRejectReservationController = (): Controller => {
  const reservationRepo = new ReservationSequelizeAdapter();
  const updateReservationStatus = new DbUpdateReservationStatus(reservationRepo);
  return new RejectReservationController(updateReservationStatus);
}; 