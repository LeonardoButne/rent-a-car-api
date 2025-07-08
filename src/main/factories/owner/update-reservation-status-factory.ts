import { UpdateReservationStatusController } from '../../../apresentation/controllers/owner/update-reservation-status-controller';
import { Controller } from '../../../apresentation/protocols';
import { DbUpdateReservationStatus, DbCompleteReservation } from '../../../data/usecases/reservation';
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';

export const makeUpdateReservationStatusController = (): Controller => {
  const reservationRepo = new ReservationSequelizeAdapter();
  const updateReservationStatus = new DbUpdateReservationStatus(reservationRepo);
  const completeReservation = new DbCompleteReservation();
  return new UpdateReservationStatusController(updateReservationStatus, completeReservation);
}; 