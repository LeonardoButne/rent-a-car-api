import { ListReservationsController } from '../../../apresentation/controllers/owner/list-reservations-controller';
import { Controller } from '../../../apresentation/protocols';
import { DbListReservationsByOwner } from '../../../data/usecases/reservation';
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';

export const makeListReservationsController = (): Controller => {
  const reservationRepo = new ReservationSequelizeAdapter();
  const listReservationsByOwner = new DbListReservationsByOwner(reservationRepo);
  return new ListReservationsController(listReservationsByOwner);
}; 