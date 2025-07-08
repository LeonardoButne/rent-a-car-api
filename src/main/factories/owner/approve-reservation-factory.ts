import { ApproveReservationController } from '../../../apresentation/controllers/owner/approve-reservation-controller';
import { Controller } from '../../../apresentation/protocols';
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';
import { DbUpdateReservationStatus } from '../../../data/usecases/reservation';

export const makeApproveReservationController = (): Controller => {
  const reservationRepo = new ReservationSequelizeAdapter();
  const updateReservationStatus = new DbUpdateReservationStatus(reservationRepo);
  return new ApproveReservationController(updateReservationStatus);
}; 