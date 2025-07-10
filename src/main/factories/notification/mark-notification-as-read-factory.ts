import { MarkNotificationAsReadController } from '../../../apresentation/controllers/notification/mark-notification-as-read-controller';
import { DbMarkNotificationAsRead } from '../../../data/usecases/notification';
import { NotificationSequelizeAdapter } from '../../../infraestruture/database/notification-sequelize-adapter';

export const makeMarkNotificationAsReadController = () => {
  // 1 - Infrastructure layer (adapters/repos)
  const notificationRepo = new NotificationSequelizeAdapter();

  // 2 - Use Case layer (domain logic)
  const markNotificationAsRead = new DbMarkNotificationAsRead(notificationRepo);

  // 3 - Controller layer
  return new MarkNotificationAsReadController(markNotificationAsRead);
}; 