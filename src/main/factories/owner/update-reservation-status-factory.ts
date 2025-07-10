import { UpdateReservationStatusController } from '../../../apresentation/controllers/owner/update-reservation-status-controller';
import { Controller } from '../../../apresentation/protocols';
import { DbUpdateReservationStatus, DbCompleteReservation } from '../../../data/usecases/reservation';
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';
import { DeviceSequelizeAdapter } from '../../../infraestruture/database/device-sequelize-adapter';
import { DbCreateNotification } from '../../../data/usecases/notification';
import { NotificationSequelizeAdapter } from '../../../infraestruture/database/notification-sequelize-adapter';
import { ReservationNotificationService } from '../../../services/reservation-notification-service';

export const makeUpdateReservationStatusController = (): Controller => {
  const reservationRepo = new ReservationSequelizeAdapter();
  const updateReservationStatus = new DbUpdateReservationStatus(reservationRepo);
  const completeReservation = new DbCompleteReservation();

  const deviceRepo = new DeviceSequelizeAdapter();
  const notificationRepo = new NotificationSequelizeAdapter();
  const createNotification = new DbCreateNotification(notificationRepo);
  const reservationNotificationService = new ReservationNotificationService(deviceRepo, createNotification);

  return new UpdateReservationStatusController(
    updateReservationStatus,
    completeReservation,
    reservationNotificationService
  );
}; 