import { CreateNotificationController } from '../../../apresentation/controllers/notification/create-notification-controller';
import { DbCreateNotification } from '../../../data/usecases/notification';
import { NotificationSequelizeAdapter } from '../../../infraestruture/database/notification-sequelize-adapter';
import { RequiredFieldValidation } from '../../../apresentation/validations/required-field-validation';
import { ValidationComposite } from '../../../apresentation/validations/validation-composite';

export const makeCreateNotificationController = () => {
  // 1 - Infrastructure layer (adapters/repos)
  const notificationRepo = new NotificationSequelizeAdapter();

  // 2 - Use Case layer (domain logic)
  const createNotification = new DbCreateNotification(notificationRepo);

  // 3 - Validation layer
  const validations = [
    new RequiredFieldValidation('userId'),
    new RequiredFieldValidation('type'),
    new RequiredFieldValidation('title'),
    new RequiredFieldValidation('message'),
    new RequiredFieldValidation('reservationId'),
  ];
  const validationComposite = new ValidationComposite(validations);

  // 4 - Controller layer
  return new CreateNotificationController(validationComposite, createNotification);
}; 