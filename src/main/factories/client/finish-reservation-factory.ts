import { FinishReservationController } from '../../../apresentation/controllers/client/finish-reservation-controller';
import { Controller } from '../../../apresentation/protocols';
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';
import { DbFinishReservation } from '../../../data/usecases/client/db-finish-reservation';

export const makeFinishReservationController = (): Controller => {
  const reservationRepo = new ReservationSequelizeAdapter();
  const finishReservation = new DbFinishReservation(reservationRepo);
  return new FinishReservationController(finishReservation);
}; 