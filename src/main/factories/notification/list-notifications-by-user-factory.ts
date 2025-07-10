import { ListNotificationsByUserController } from '../../../apresentation/controllers/notification/list-notifications-by-user-controller';
import { DbListNotificationsByUser } from '../../../data/usecases/notification';
import { NotificationSequelizeAdapter } from '../../../infraestruture/database/notification-sequelize-adapter';

export const makeListNotificationsByUserController = () => {
  // 1 - Infrastructure layer (adapters/repos)
  const notificationRepo = new NotificationSequelizeAdapter();

  // 2 - Use Case layer (domain logic)
  const listNotificationsByUser = new DbListNotificationsByUser(notificationRepo);

  // 3 - Controller layer
  return new ListNotificationsByUserController(listNotificationsByUser);
}; 