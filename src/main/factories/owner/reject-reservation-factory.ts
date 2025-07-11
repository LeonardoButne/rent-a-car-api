import { RejectReservationController } from '../../../apresentation/controllers/owner/reject-reservation-controller';
import { Controller } from '../../../apresentation/protocols';
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';
import { DbUpdateReservationStatus, DbGetReservationById } from '../../../data/usecases/reservation';
import { DeviceSequelizeAdapter } from '../../../infraestruture/database/device-sequelize-adapter';
import { NotificationSequelizeAdapter } from '../../../infraestruture/database/notification-sequelize-adapter';
import { DbCreateNotification } from '../../../data/usecases/notification';
import { ReservationNotificationService } from '../../../services/reservation-notification-service';

export const makeRejectReservationController = (): Controller => {
  const reservationRepo = new ReservationSequelizeAdapter();
  const updateReservationStatus = new DbUpdateReservationStatus(reservationRepo);
  const getReservationById = new DbGetReservationById(reservationRepo);

  const deviceRepo = new DeviceSequelizeAdapter();
  const notificationRepo = new NotificationSequelizeAdapter();
  const createNotification = new DbCreateNotification(notificationRepo);
  const reservationNotificationService = new ReservationNotificationService(deviceRepo, createNotification);

  return new RejectReservationController(
    updateReservationStatus,
    getReservationById,
    reservationNotificationService
  );
}; 