import { CreateReservationController } from '../../../apresentation/controllers/client/create-reservation-controller';
import { Controller } from '../../../apresentation/protocols';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';
import { RequestFieldValidation } from '../../../apresentation/validations/request-field-validation';
import { DbCreateReservation } from '../../../data/usecases/reservation';
import { ReservationSequelizeAdapter } from '../../../infraestruture/database/reservation-sequelize-adapter';
import { DeviceSequelizeAdapter } from '../../../infraestruture/database/device-sequelize-adapter';
import { DbCreateNotification } from '../../../data/usecases/notification';
import { NotificationSequelizeAdapter } from '../../../infraestruture/database/notification-sequelize-adapter';
import { ReservationNotificationService } from '../../../services/reservation-notification-service';

export const makeCreateReservationController = (): Controller => {
  const reservationRepo = new ReservationSequelizeAdapter();
  const createReservation = new DbCreateReservation(reservationRepo);

  const deviceRepo = new DeviceSequelizeAdapter();
  const notificationRepo = new NotificationSequelizeAdapter();
  const createNotification = new DbCreateNotification(notificationRepo);
  const reservationNotificationService = new ReservationNotificationService(deviceRepo, createNotification);

  const requiredFields = ['carId', 'ownerId', 'startDate', 'endDate'];
  const validations = [];
  for (const field of requiredFields) {
    validations.push(new RequestFieldValidation(field));
  }
  const validationComposite = new ValidationComposite(validations);

  return new CreateReservationController(
    validationComposite,
    createReservation,
    reservationNotificationService
  );
};
