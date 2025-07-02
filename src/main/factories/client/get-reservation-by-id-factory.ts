import { GetReservationByIdController } from '../../../apresentation/controllers/client/get-reservation-by-id-controller';
import { Controller } from '../../../apresentation/protocols';
import { DbGetReservationById } from '../../../data/usecases/reservation';
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';

export const makeGetReservationByIdController = (): Controller => {
  const reservationRepo = new ReservationSequelizeAdapter();
  const getReservationById = new DbGetReservationById(reservationRepo);
  return new GetReservationByIdController(getReservationById);
}; 