import { EditReservationController } from '../../../apresentation/controllers/client/edit-reservation-controller';
import { Controller } from '../../../apresentation/protocols';
import { DbEditReservation } from '../../../data/usecases/reservation';
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';

export const makeEditReservationController = (): Controller => {
  const reservationRepo = new ReservationSequelizeAdapter();
  const editReservation = new DbEditReservation(reservationRepo);
  return new EditReservationController(editReservation);
}; 