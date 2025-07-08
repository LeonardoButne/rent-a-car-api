import { ActivateReservationController } from '../../../apresentation/controllers/client/activate-reservation-controller';
import { Controller } from '../../../apresentation/protocols';
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';
import { DbActivateReservation } from '../../../data/usecases/client/db-activate-reservation';

export const makeActivateReservationController = (): Controller => {
  const reservationRepo = new ReservationSequelizeAdapter();
  const activateReservation = new DbActivateReservation(reservationRepo);
  return new ActivateReservationController(activateReservation);
}; 