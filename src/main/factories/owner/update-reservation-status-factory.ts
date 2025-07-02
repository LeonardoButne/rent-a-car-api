import { UpdateReservationStatusController } from '../../../apresentation/controllers/owner/update-reservation-status-controller';
import { Controller } from '../../../apresentation/protocols';
import { DbUpdateReservationStatus } from '../../../data/usecases/reservation';
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';

export const makeUpdateReservationStatusController = (): Controller => {
  const reservationRepo = new ReservationSequelizeAdapter();
  const updateReservationStatus = new DbUpdateReservationStatus(reservationRepo);
  return new UpdateReservationStatusController(updateReservationStatus);
}; 