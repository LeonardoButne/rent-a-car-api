import { ListMyReservationsController } from '../../../apresentation/controllers/client/list-my-reservations-controller';
import { Controller } from '../../../apresentation/protocols';
import { DbListReservationsByClient } from '../../../data/usecases/reservation';
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';

export const makeListMyReservationsController = (): Controller => {
  const reservationRepo = new ReservationSequelizeAdapter();
  const listReservationsByClient = new DbListReservationsByClient(reservationRepo);
  return new ListMyReservationsController(listReservationsByClient);
}; 